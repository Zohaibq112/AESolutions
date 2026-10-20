// Official platform marks (from the devicon set) — embedded at build time.
import aws from './assets/logos/aws.svg'
import azure from './assets/logos/azure.svg'
import gcp from './assets/logos/gcp.svg'
import oracle from './assets/logos/oracle.svg'
import sap from './assets/logos/sap.svg'

export const PLATFORMS = [
  { key: 'aws', name: 'Amazon Web Services', short: 'AWS', logo: aws },
  { key: 'azure', name: 'Microsoft Azure', short: 'Azure', logo: azure },
  { key: 'gcp', name: 'Google Cloud', short: 'Google Cloud', logo: gcp },
  { key: 'oracle', name: 'Oracle', short: 'Oracle', logo: oracle },
  { key: 'sap', name: 'SAP', short: 'SAP', logo: sap },
]
export const LOGO = Object.fromEntries(PLATFORMS.map((p) => [p.key, p.logo]))
