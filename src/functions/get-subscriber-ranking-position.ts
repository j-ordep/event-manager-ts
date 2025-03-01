import { redis } from "../redis/client"

interface GetSubscriberRankingPositionParams {
  subscriberId: string
}

export async function getSubscriberRankingPosition({ subscriberId }: GetSubscriberRankingPositionParams) {
  const rank = await redis.zrevrank('referral:ranking', subscriberId) // retorna o index do subscriberId no ranking

  if (rank === null) {
    return { position: null }
  }

  return { position: rank + 1 }
} 