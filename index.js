/**
 *
 * @param {*} obj
 * @param {OptionsLogger} options
 * @return {*}
 */
function proxyLogger(obj, options = {}) {
	const regexExclude = options.regexExclude ?? false;
	const loopStart = options.loopStart ?? 'Start'
	const pushLog = options.logMethod ?? 'pushLog'

	return new Proxy(obj, {
		lastProp: loopStart,
		get (target, prop) {
			const self = this;
			const origMethod = target[prop];

			if (typeof origMethod !== 'function') {
				return target[prop];
			}

			return function(...args) {
				let time = process.hrtime();
				let result = origMethod.apply(this, args);
				let end = (process.hrtime(time)[1] / 1e6).toFixed(3);

				if (!regexExclude || !regexExclude.test(prop)) {
					const text = self.lastProp + ' --> | ' + end + ' ms | ' + prop;
					target[pushLog](text, {}, 'graph');
					self.lastProp = prop;
				}

				return result;
			};
		},

		set(target, prop, value) {
			target[prop] = value;
			return true;
		},
	});
}

module.exports = {
	proxyLogger
}