/**
 * @file Calls the core validation with an hardcoded TD string as input
 * 		 to check whether the validation throws an error and allow manual
 * 		 checking of the result
 */

const { tdValidator, compress, decompress } = require("../index")

const simpleTD = `{
	"id": "urn:simple",
	"@context": "https://www.w3.org/2022/wot/td/v1.1",
	"title": "MyLampThing",
	"description": "Valid TD copied from the spec's first example",
	"securityDefinitions": {
		"basic_sc": {
			"scheme": "basic",
			"in": "header"
		},
		"basic_scd": {
			"scheme": "basic",
			"in": "header"
		}
	},
	"security": [
		"basic_sc"
	],
	"properties": {
		"status": {
			"type": "string",
			"forms": [
				{
					"href": "https://mylamp.example.com/status"
				}
			]
		}
	},
	"actions": {
		"toggle": {
			"forms": [
				{
					"href": "https://mylamp.example.com/toggle"
				}
			]
		},
		"toggled": {
			"forms": [
				{
					"href": "https://mylamp.example.com/toggle"
				}
			]
		}
	},
	"events": {
		"overheating": {
			"data": {
				"type": "string"
			},
			"forms": [
				{
					"href": "https://mylamp.example.com/oh",
					"subprotocol": "longpoll"
				}
			]
		}
	}
}`

test("normal report generation", () => {
	expect.assertions(1)

	return tdValidator(simpleTD, ()=>{}, {})
	.then( result => {
		const refResult = {
			report: {
				json: 'passed',
				schema: 'passed',
				defaults: 'warning',
				jsonld: 'passed',
				additional: 'passed'
			},
			details: {
				enumConst: 'passed',
				propItems: 'passed',
				security: 'passed',
				propUniqueness: 'passed',
				multiLangConsistency: 'passed',
				linksRelTypeCount: 'passed',
				readWriteOnly: 'passed',
				uriVariableSecurity: 'passed'
			},
			detailComments: {
				enumConst: expect.any(String),
				propItems: expect.any(String),
				security: expect.any(String),
				propUniqueness: expect.any(String),
				multiLangConsistency: expect.any(String),
				linksRelTypeCount: expect.any(String),
				readWriteOnly: expect.any(String),
				uriVariableSecurity: expect.any(String)
			}
		}
		expect(result).toEqual(refResult)
	}, err => {
		console.error(err)
	})
})

test('test td (de)compression', () => {
	const compressed = compress(simpleTD)
	expect(simpleTD).toEqual(decompress(compressed))
	expect(compressed).toEqual('N4KAkARAlgJhBcACCBXATgO3gZygWwAcAbAUwgBpwIABAYwHsMAXEgDyYWQAsmmDt4AekEB3MQDoRAZnH00Ac0EAmAAxKlo+k0FMYggG4BGcYYpUmUJqU4QAsgE8AMgENCAFS5QM8s5BglsWjQoAgtGGwA1ZyJYRDcAEUQGAigSGEQAMzR6PEQmLhJEbAISWgBybEyoNGwmRDZXYjJKSGxS9Et7eJIMr0soRmxOUDBIACNnXFoAfUDh8FGIQIK8MiQICanfRa8bAud-NAgFgF8W8cmoGcC4JBHF5ZJVm02r7chd9f3D49GT8DOVDatA6THsnAA2gsNpdrrRfgBdFoQAjZEpoCwBeYPJjOJgoIZ3BaQMElGy1YLed4QDJyPCExBQ0aje7MiBcNA9Pa8fhCQR4exERriBqEUjiBh4QS1PEE37M-7MhGnAHI5y0MIYBn3CBMejyeTWIls2loemQ4lgVmLDlcr48gTCAVCwgi1iNcWSnT6w1kS2K0bKv7nXU+0i3RCsml0hlM5nWyC2jLcviO-mC4WipoSnLeg3Wf3EoNgRWAyAkfQkZja6H0StofYWKnGxYwPHObFs0lrZAUrw+Yllxam81IOMsy2JznJ+2pvnOzPusUkHNS+hcd4PFBjVFaegMIg2IiMeQEehEQ+FpUqksgE5AA')
	expect(simpleTD).toEqual(decompress('N4KAkARAlgJhBcACCBXATgO3gZygWwAcAbAUwgBpwIABAYwHsMAXEgDyYWQAsmmDt4AekEB3MQDoRAZnH00Ac0EAmAAxKlo+k0FMYggG4BGcYYpUmUJqU4QAsgE8AMgENCAFS5QM8s5BglsWjQoAgtGGwA1ZyJYRDcAEUQGAigSGEQAMzR6PEQmLhJEbAISWgBybEyoNGwmRDZXYjJKSGxS9Et7eJIMr0soRmxOUDBIACNnXFoAfUDh8FGIQIK8MiQICanfRa8bAud-NAgFgF8W8cmoGcC4JBHF5ZJVm02r7chd9f3D49GT8DOVDatA6THsnAA2gsNpdrrRfgBdFoQAjZEpoCwBeYPJjOJgoIZ3BaQMElGy1YLed4QDJyPCExBQ0aje7MiBcNA9Pa8fhCQR4exERriBqEUjiBh4QS1PEE37M-7MhGnAHI5y0MIYBn3CBMejyeTWIls2loemQ4lgVmLDlcr48gTCAVCwgi1iNcWSnT6w1kS2K0bKv7nXU+0i3RCsml0hlM5nWyC2jLcviO-mC4WipoSnLeg3Wf3EoNgRWAyAkfQkZja6H0StofYWKnGxYwPHObFs0lrZAUrw+Yllxam81IOMsy2JznJ+2pvnOzPusUkHNS+hcd4PFBjVFaegMIg2IiMeQEehEQ+FpUqksgE5AA'))
})
