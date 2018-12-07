import axios from 'axios'
import { baseUrl } from './baseUrl'
export default function http(url, params = {}) {
	let defaultOptions = {
		method : 'get',
		timeout: 1000 * 20,
		url: `${baseUrl}${url}`,
		params,
		headers: {
			"Content-Type": "application/json; charset=UTF-8",
		}
	}
  return axios(defaultOptions)
}