export const errorResolved = (e: unknown): string => {
  switch (e) {
    case 401:
      return "invalid credentials"
    default:
      return "invalid credentials"
  }
}

const getUnixTime = () => {
  return Math.round(+new Date() / 1000)
}
const LIFE_TIME_TO_UPDATE = 0.5
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true
  try {
    const tokenInfo = token.split(".")[1]
    const tokenInfoDecoded = window.atob(tokenInfo)
    const { exp, iat } = JSON.parse(tokenInfoDecoded)

    const tokenLeftTime = exp - getUnixTime()

    const minLeftTimeForUpdate = (exp - iat) * LIFE_TIME_TO_UPDATE

    return tokenLeftTime < minLeftTimeForUpdate
  } catch (e) {
    return true
  }
}
