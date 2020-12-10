/*
 * Jira Ticket:
 * Created Date: Mon, 30th Nov 2020, 12:56:00 pm
 * Author: Jessica Mowatt
 * Email: jessica.mowatt@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

function ReactAdminNotifyError({
  message,
  payload,
  undoable = false,
  timeout = null,
}) {
  this.message = message;
  this.stack = Error().stack;
  this.type = 'warning';
  this.payload = payload;
  this.undoable = undoable;
  this.timeout = timeout;
}
ReactAdminNotifyError.prototype = Object.create(Error.prototype);
ReactAdminNotifyError.prototype.name = 'ReactAdminNotifyError';

export { ReactAdminNotifyError };
