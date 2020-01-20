'use strict'

exports.config = {
  app_name: ['thesource-media-backend'],
  license_key: `${ process.env.NEW_RELIC_LICENSE_KEY}`,
  logging: {
    level: 'trace',
    filepath: '../../../newrelic_agent.log'
  },
  utilization: {
    detect_aws: false,
    detect_pcf: false,
    detect_azure: false,
    detect_gcp: false,
    detect_docker: false
  },
  transaction_tracer: {
    enabled: true
  }
}
