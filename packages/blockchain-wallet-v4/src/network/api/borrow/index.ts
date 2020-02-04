import { CoinType } from 'core/types'
import { LoanType, OfferType } from './types'

export default ({ nabuUrl, authorizedGet, authorizedPost, authorizedPut }) => {
  const getOffers = (): Array<OfferType> =>
    authorizedGet({
      url: nabuUrl,
      endPoint: '/lending/offers'
    })

  const createLoan = (
    collateralWithdrawAddress: string,
    offerId: string,
    principalAmount: { symbol: CoinType; value: string },
    principalWithdrawAddress: string
  ): LoanType =>
    authorizedPost({
      url: nabuUrl,
      endPoint: '/user/loans',
      contentType: 'application/json',
      data: {
        collateralWithdrawAddress,
        offerId,
        principalAmount,
        principalWithdrawAddress
      }
    })

  const getUserBorrowHistory = (): Array<LoanType> =>
    authorizedGet({
      url: nabuUrl,
      endPoint: '/user/loans'
    })

  return {
    createLoan,
    getOffers,
    getUserBorrowHistory
  }
}
