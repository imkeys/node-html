/**
 * 提供Logger对像，统一日志处理。 
 */
const logLeaves = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
var logLevaeIndex = 1;
var serviceName = null;

function c2(v) {
  return v <= 9 ? '0' + v : v.toString();
}

function log(type, ...msg) {
  if (serviceName === null)
    throw new Error('please call setServiceName');
  let typeIndex = logLeaves.indexOf(type);
  if (typeIndex < logLevaeIndex) return; //不需要log

  let t = new Date();
  if (!(msg instanceof Array))
    msg = [msg];

  let tmp = [];
  msg.forEach((item) => {
    tmp = tmp.concat(item);
  });
  msg = tmp;
  msg = msg.map((item) => {
    let s = item ? item.toString() : '';
    if (typeof item == 'string')
      return '"' + s + '"';
    else if (typeof item == 'number')
      return '' + s + '';
    else if (typeof item == 'object')
      return JSON.stringify(item) == '{}' ? item.toString() : JSON.stringify(item);
    else
      return s;
  }).join(' ');
  t = t.getFullYear() + '-' + c2(t.getMonth() + 1) + '-' + c2(t.getDate()) + " " +
    c2(t.getHours()) + ":" + c2(t.getMinutes()) + ":" + c2(t.getSeconds());
  msg = '[' + type + '] [' + t + '] [' + serviceName + '] ' + msg;
  console.log(msg);
}

module.exports.Logger = {
  setServiceName: (name) =>
    serviceName = name,
  setLogLeave: (leave) => logLevaeIndex = logLeaves.indexOf(leave.toUpperCase()),
  error: (...msg) => log('ERROR', ...msg),
  warn: (...msg) => log('WARN', msg),
  info: (...msg) => log('INFO', ...msg),
  debug: (...msg) => log('DEBUG', ...msg),
  fatal: (...msg) => log('FATAL', ...msg)
}