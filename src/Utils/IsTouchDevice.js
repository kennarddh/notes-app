// simple way to check whether the device support touch (it doesn't check all fallback, it supports only modern browsers)
const IsTouchDevice = () => 'ontouchstart' in window

export default IsTouchDevice
