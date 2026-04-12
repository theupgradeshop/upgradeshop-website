import { fetchProductsFromDB, fetchStoreExchangeRates } from '@/lib/db-products';
import { enrichWithStaticData } from '@/lib/fetch-products';
import { modules, websiteAddons, crmEmailBundle } from '@/lib/products';
import PricingClient from './pricing-client';

export const revalidate = 60;

export default async function PricingPage() {
  const [dbProducts, exchangeRates] = await Promise.all([
    fetchProductsFromDB(),
    fetchStoreExchangeRates(),
  ]);

  const allDbProducts = enrichWithStaticData(dbProducts);
  const hasDbData = allDbProducts.length > 0;

  const finalModules = hasDbData
    ? allDbProducts.filter(p => p.category === 'module')
    : modules;

  const finalWebsiteAddons = hasDbData
    ? allDbProducts.filter(p => p.category === 'website-addon')
    : websiteAddons;

  const finalBundle = hasDbData
    ? allDbProducts.find(p => p.category === 'bundle') || crmEmailBundle
    : crmEmailBundle;

  const finalServices = hasDbData
    ? allDbProducts.filter(p => p.category === 'service')
    : [];

  return (
    <PricingClient
      modules={finalModules}
      websiteAddons={finalWebsiteAddons}
      bundle={finalBundle}
      services={finalServices}
      exchangeRates={exchangeRates}
    />
  );
}
