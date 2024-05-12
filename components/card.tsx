import { Plan } from '@/pages'
import React from 'react'
import styled from 'styled-components';

interface Props {
  data: Plan;
  isYearly: boolean;
  rate: number;
  currency: string;
}

const colorMap: { [key: string]: string } = {
  basic: '#05192d',
  premium: '#00c53b',
  teams: '#009bd8',
  enterprise: '#ff5400'
};

interface IsPremiumProps {
  ispremium: boolean;
}

interface TitleProps {
  color: keyof typeof colorMap;
  ispremium: boolean;
}

interface DivPriceProps {
  backgroundcolor: string;
}

export default function Card({ data, isYearly, rate, currency }: Props) {

  const isPremium = data.id === "premium";
  const isTeams = data.id === "teams";
  const price = isYearly ? data.price.valueYearly : data.price.valueMonthly;

  return (
    <Item ispremium={isPremium}>
      {isPremium &&
        <Badge ispremium={isPremium}>
          Most Popular
        </Badge>
      }
      {isTeams &&
        <Badge ispremium={isPremium}>
          Is Special
        </Badge>
      }
      <DivTitle>
        <Title color={data.id} ispremium={isPremium}>{data.title}</Title>
        <SubTitle>{data.subTitle}</SubTitle>
      </DivTitle>
      <DivPrice backgroundcolor={isPremium ? 'rgb(3,239,98)' : isTeams ? 'rgb(217, 217, 225)' : '#fff'}>
        {price === 0 ?
          <>Free</>
          :
          <>{!isNaN(Number(price)) ? `${currency === 'EUR' ? '€' : '$'}` + Math.round(Number(price) * rate)  : price}</>
        }
      </DivPrice>
      <DivButtonList>
        <Button ispremium={isPremium}>
          {data.id === 'basic' &&
            <>Get Started</>
          }
          {isPremium &&
            <>Subscribe Now</>
          }
          {data.id === 'teams' &&
            <>Set Up a Team</>
          }
          {data.id === 'enterprise' &&
            <>Request a Demo</>
          }
        </Button>
        <List>
          {data.features.map((feature, index) => (
            <li key={index}>
              {feature.available ?
                <svg viewBox="0 0 18 18" aria-hidden="false" height="18" role="img" width="18"><title>Checkmark</title><path fill="currentColor" d="M13.746 4.337a1.015 1.015 0 011.409-.099c.417.354.462.97.101 1.378l-7.13 8.047a1.015 1.015 0 01-1.483.03L2.771 9.67a.961.961 0 01.044-1.38 1.015 1.015 0 011.412.041l3.113 3.235 6.406-7.229z" fillRule="evenodd"></path></svg>
                :
                <svg viewBox="0 0 18 18" aria-hidden="false" height="18" role="img" width="18"><title>Cross</title><path fill="currentColor" d="M9.005 7.625l4.83-4.83a.976.976 0 011.38 1.38l-4.83 4.83 4.82 4.82a.976.976 0 11-1.38 1.38l-4.82-4.82-4.83 4.83a.976.976 0 01-1.38-1.38l4.83-4.83-4.84-4.84a.976.976 0 111.38-1.38l4.84 4.84z" fillRule="evenodd"></path></svg>
              }
              {feature.description}
            </li>
          ))}
        </List>
      </DivButtonList>
    </Item>
  )
}

const Item = styled.article<IsPremiumProps>`
  position: relative;
  width: 100%;
  order: ${props => props.ispremium ? -1 : 'unset'};
  padding-bottom: 32px;
  padding-top: 28px;
  border-radius: 4px;
  background-color:#fff;
  border-top: ${props => props.ispremium && '8px solid rgb(3, 239, 98)'};
  @media screen and (min-width: 600px){
    width: calc(50% - 16px);
  }
  @media screen and (min-width: 1200px){
    order: ${props => props.ispremium ? 0 : 'unset'};
    width: 285px;
    &:nth-child(1){
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
    &:nth-child(2){
      box-shadow: 0px 11px 22px rgba(0, 0, 0, 0.3);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      margin-top: -16px;
      z-index: 0;
    }
    &:nth-child(3){
      border-radius: 0;
    }
    &:nth-child(4){
      border-left: 2px solid #d9d9e2;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
`;

const Badge = styled.strong<IsPremiumProps>`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1.2;
  margin-top: 0;
  text-transform: uppercase;
  background-color: ${props => props.ispremium ? 'rgb(3, 239, 98)' : 'rgb(217, 217, 226)'};
  border-radius: 2px;
  display: inline-block;
  left: 24px;
  position: absolute;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
  top: ${props => props.ispremium ? '-16px' : '-12px'};
`;

const DivTitle = styled.div`
  margin-left: 24px;
  margin-right: 24px;
  @media screen and (min-width: 1200px){    
    margin-left: 22px;
    margin-right: 22px;
  }
`;

const Title = styled.h2<TitleProps>`
  color: ${props => colorMap[props.color]};
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 4px;
  margin-top: -8px;
  @media screen and (min-width: 1200px){
    margin-top: ${props => props.ispremium ? '8px' : '0'};
  }
`;

const SubTitle = styled.strong`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1.2;
  margin-top: 0;
  text-transform: uppercase;
  @media screen and (min-width: 768px){
    font-size: 0.875rem;
  }
`;

const DivPrice = styled.div<DivPriceProps>`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  display: flex;
  background-color: ${props => props.backgroundcolor};
  align-items: center;
  height: 72px;
  margin-top: 16px;
  margin-bottom: 16px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
  @media screen and (min-width: 1200px){
    padding-left: 22px;
    padding-right: 22px;
    padding-top: 10px;
    padding-bottom: 10px;
    min-height: 0;
  }
`;

const DivButtonList = styled.div`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  margin-left: 24px;
  margin-right: 24px;
  @media screen and (min-width: 1200px){    
    margin-left: 22px;
    margin-right: 22px;
  }
`;

const Button = styled.a<IsPremiumProps>`
  align-items: center;
  border-color: transparent;
  border-radius: 4px;
  border-style: solid;
  border-width: 2px;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  flex-shrink: 0;
  font-weight: 800;
  justify-content: center;
  line-height: 1;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  text-decoration: none;
  transition: background-color 125ms ease-out;
  user-select: none;
  vertical-align: middle;
  background-color: transparent;
  color: #05192D;
  font-size: 16px;
  height: 48px;
  min-width: 48px;
  width: auto;
  padding-left: 24px;
  padding-right: 24px;
  background-color: ${props => props.ispremium ? '#03EF62' : '#fff'};
  border-color: ${props => props.ispremium ? 'transparent' : 'rgba(48, 57, 105, 0.6)'};
  width: 100%;
  &:hover{
    cursor: pointer;
    &:before{
      background-color: rgba(48, 57, 105, 0.1);
    }
  }
`;

const List = styled.ul`
  box-sizing: border-box;
  margin: 0;
  min-width: 0;
  margin-top: 24px;
  list-style: none;
  padding: 0;
  li{
    margin-top: 8px;
    display: flex;
    align-items: flex-start;
    font-size: 0.875rem;
    svg{
      flex-shrink: 0;
      margin: 2px 8px 0 0;
    }
  }
`;