const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

const run = () => {
  // Get input files
  const bucketName = core.getInput('bucket-name', { required: true })
  const bucketRegion = core.getInput('bucket-region', { required: true })
  const distFolder = core.getInput('dist-folder', { required: true })

  // Upload files
  // NOTE: AWS CLI is installed on runners
  const s3Uri = `s3://${bucketName}`
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)

  const websiteUrl = `http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com`
  core.setOutput('website-url', websiteUrl)
}

run()
