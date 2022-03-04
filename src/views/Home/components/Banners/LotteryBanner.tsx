import { ArrowForwardIcon, Button, Text, Heading } from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useTranslation } from 'contexts/Localization'
import useMediaQuery from 'hooks/useMediaQuery'
import useTheme from 'hooks/useTheme'
import Image from 'next/image'
import { memo } from 'react'
import { useLottery } from 'state/lottery/hooks'
import styled from 'styled-components'
import getTimePeriods from 'utils/getTimePeriods'
import Timer from 'views/Lottery/components/Countdown/Timer'
import useGetNextLotteryEvent from 'views/Lottery/hooks/useGetNextLotteryEvent'
import useNextEventCountdown from 'views/Lottery/hooks/useNextEventCountdown'
import { lotteryImage, lotteryMobileImage } from './images'
import * as S from './Styled'

const RightWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: -8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    bottom: -5px;
  }
`
const TimerWrapper = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 16px;
  }
  margin-bottom: 8px;
  .custom-timer {
    background: url('/images/decorations/countdownBg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0px 10px 7px;
    /* justify-content: center;
    align-items: center; */
    display: inline-flex;
  }
`

export const StyledSubheading = styled(Heading)`
  font-size: 20px;
  color: white;
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 24px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    -webkit-text-stroke: unset;
  }
  margin-bottom: 8px;
`

const LotteryCountDownTimer = () => {
  const {
    currentRound: { status, endTime },
  } = useLottery()
  const endTimeAsInt = parseInt(endTime, 10)
  const { nextEventTime } = useGetNextLotteryEvent(endTimeAsInt, status)
  const secondsRemaining = useNextEventCountdown(nextEventTime)
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining)
  return <Timer wrapperClassName="custom-timer" seconds={seconds} minutes={minutes} hours={hours} days={days} />
}

const LotteryBanner = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isDeskTop = useMediaQuery(theme.theme.mediaQueries.sm.replace('@media screen and ', ''))
  return (
    <S.Wrapper>
      <S.Inner>
        <S.LeftWrapper>
          <StyledSubheading>Win $ 1,234,567 in Lottery</StyledSubheading>
          <TimerWrapper>
            <LotteryCountDownTimer />
          </TimerWrapper>
          <NextLinkFromReactRouter to="/lottery">
            <Button>
              <Text color="invertedContrast" bold fontSize="16px" mr="4px">
                {t('Play Now')}
              </Text>
              <ArrowForwardIcon color="invertedContrast" />
            </Button>
          </NextLinkFromReactRouter>
        </S.LeftWrapper>
        <RightWrapper>
          {isDeskTop && (
            <Image
              src={lotteryImage}
              alt="LotteryBanner"
              onError={(event) => {
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                event.target?.style.display = 'none'
              }}
              width={1112}
              height={192 + 32}
              placeholder="blur"
            />
          )}
          {!isDeskTop && (
            <Image
              className="mobile"
              src={lotteryMobileImage}
              alt="LotteryBanner"
              onError={(event) => {
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                event.target?.style.display = 'none'
              }}
              width={215}
              height={144}
              placeholder="blur"
            />
          )}
        </RightWrapper>
      </S.Inner>
    </S.Wrapper>
  )
}

export default memo(LotteryBanner)
