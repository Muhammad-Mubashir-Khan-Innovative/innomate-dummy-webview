// Client-side, demo-only "Out of Service" lockout tracker (no backend).
// Persisted to localStorage so it survives the WebView app being backgrounded/closed
// and reopened within the lockout window.
const STORAGE_KEY = "demoOutOfServiceUntil";
const LOCKOUT_DURATION_MS = 60 * 60 * 1000; // 1 hour

const readMap = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

const writeMap = (map) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch (e) {
    // ignore storage failures (e.g. private browsing quota)
  }
};

// Reads the map, drops any expired entry for this device, and persists the
// cleanup — this is the "auto-revert": there is no timer anywhere, expiry is
// simply resolved the next time anything asks about this device.
const getActiveExpiry = (deviceId) => {
  const map = readMap();
  const expiry = map[deviceId];
  if (!expiry) return null;
  if (expiry <= Date.now()) {
    delete map[deviceId];
    writeMap(map);
    return null;
  }
  return expiry;
};

export const isOutOfService = (deviceId) => getActiveExpiry(deviceId) !== null;

export const markOutOfService = (deviceId) => {
  const map = readMap();
  map[deviceId] = Date.now() + LOCKOUT_DURATION_MS;
  writeMap(map);
};

export const getRemainingMinutes = (deviceId) => {
  const expiry = getActiveExpiry(deviceId);
  if (!expiry) return null;
  return Math.max(1, Math.ceil((expiry - Date.now()) / 60000));
};

// "Bring In Service" reverts a device immediately, ignoring the 1-hour timer.
export const clearOutOfService = (deviceId) => {
  const map = readMap();
  if (deviceId in map) {
    delete map[deviceId];
    writeMap(map);
  }
};

const STATUS_LINE_PATTERN = /^Status:.*$/;
const SUPERVISORY_LINE_PATTERN = /^(Supervisory Mode:\s*)\d+(.*)$/;

// Overrides the Device Details tabs ([tab1, tab2, tab3, tab4] arrays of strings)
// for a locked device: Tab1's "Status" line becomes "Supervisory Mode", and
// Tab4's "Supervisory Mode" line is forced to "1" (rendered as "Full Failure").
export const getEffectiveDeviceTabs = (tabsArray, deviceId) => {
  if (!tabsArray || !isOutOfService(deviceId)) return tabsArray;
  const [tab1, tab2, tab3, tab4] = tabsArray;
  const overriddenTab1 = (tab1 || []).map((line) =>
    STATUS_LINE_PATTERN.test(line) ? "Status: Supervisory Mode" : line
  );
  const overriddenTab4 = (tab4 || []).map((line) => {
    const match = line.match(SUPERVISORY_LINE_PATTERN);
    return match ? `${match[1]}1${match[2]}` : line;
  });
  return [overriddenTab1, tab2, tab3, overriddenTab4];
};
