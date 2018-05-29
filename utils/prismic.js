import Prismic from 'prismic-javascript'

const PRISMIC_ACCESS_TOKEN = 'MC5Xb0pJM1NjQUFDa0FxaEI2.Ou-_vXTvv73vv73vv73vv70NOO-_ve-_vU3vv73vv73vv70RLzvvv73vv73vv73vv73vv70lde-_ve-_vQrvv73vv73vv73vv70'
const PRISMIC_REPO = 'https://lydia-pang.prismic.io/api/v2'

export const initApi = (req) => {
  return Prismic.getApi(PRISMIC_REPO, {
    accessToken: PRISMIC_ACCESS_TOKEN,
    req: req,
  })
}