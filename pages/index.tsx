import { useEffect, useState } from "react";
import styled from "styled-components";
import PlansData from '../api/data.json';
import CardsList from "@/components/cardsList";

export interface Plan {
  id: string;
  title: string;
  subTitle: string;
  price: {
    valueYearly: string | number;
    valueMonthly: string | number;
    discountYearly: number;
    discountMonthly?: number;
  };
  features: {
    available: boolean;
    description: string;
  }[];
}

export interface CurrencyRates {
  [key: string]: number;
}

export default function Home() {

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Plan[]>([]);
  const [conversionRate, setConversionRate] = useState<CurrencyRates>({});

  useEffect(() => {
    setLoading(true);
    fetch('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_L9kTHHjn3SZkX1HPQZZLo4irjE17TTv7GXlhD7YN&currencies=EUR%2CUSD%2CCAD&base_currency=EUR')
      .then(response => response.json())
      .then(data => {
        setData(PlansData);
        setConversionRate(data.data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <CardsList
        isLoading={loading}
        data={data}
        conversionRate={conversionRate}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
  max-width: 100vw;
  background-color: #05192d;
  @media screen and (max-width: 600px){
    padding: 24px 12px;
  }
`;