import { CurrencyRates, Plan } from '@/pages';
import React, { useMemo, useState } from 'react'
import styled from 'styled-components';
import Card from './card';

interface Props {
  isLoading: boolean,
  data: Plan[];
  conversionRate: CurrencyRates;
}

export default function CardsList({ isLoading, data, conversionRate }: Props) {

  const [isYearly, setIsYearly] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('EUR');
  const options = Object.entries(conversionRate).map(([currency, rate]) => ({
    currency,
    rate
  }));

  const selectOptions = useMemo(() => {
    return options.map((option) => ({
      label: option.currency,
      value: option.currency
    }))
  }, [options]);

  const rate = useMemo(() => {
    return conversionRate[selectedOption];
  }, [conversionRate, selectedOption])

  if (isLoading) {
    return (<>Loading ...</>)
  }
  if (data.length > 0) {
    return (
      <Container>
        <ContainerOptions>
          <div>
            <ToggleSwitchContainer>
              <ToggleSwitchLabel>Save with Yearly</ToggleSwitchLabel>
              <HiddenToggleSwitchInput
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
              />
              <ToggleSwitchSlider />
            </ToggleSwitchContainer>
          </div>
          <SelectContainer>
            <Select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              {selectOptions.map((option, index) => (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <ArrowIcon>&#9660;</ArrowIcon>
          </SelectContainer>
        </ContainerOptions>
        <ContainerCards>
          {data.map((item, index) => (
            <Card key={index} data={item} isYearly={isYearly} rate={rate} currency={selectedOption}/>
          ))}
        </ContainerCards>
      </Container>
    )
  } else {
    <>No data</>
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerOptions = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  @media screen and (min-width: 1200px){
    justify-content: flex-end;
  }
`;

const ContainerCards = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  @media screen and (max-width: 1200px){
    gap: 16px;
  }
`;

const ToggleSwitchContainer = styled.label`
  display: flex;
  align-items: center;
`;

const ToggleSwitchLabel = styled.span`
  margin-right: 8px;
  color: #fff;
`;

const HiddenToggleSwitchInput = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
`;

const ToggleSwitchSlider = styled.span`
  position: relative;
  width: 34px;
  height: 18px;
  background-color: #ccc;
  border-radius: 18px;
  display: inline-block;
  cursor: pointer;

  &:before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  ${HiddenToggleSwitchInput}:checked + & {
    background-color: #2196f3;
  }

  ${HiddenToggleSwitchInput}:checked + &:before {
    transform: translateX(16px);
  }
`;

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Select = styled.select`
  appearance: none;
  padding: 8px 30px 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  width: 80px;
  outline: none;
`;

const ArrowIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

const Option = styled.option`
  color: black;
`;