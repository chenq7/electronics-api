import { AggregatedPart, Packaging, PriceBreak, 
         TTIPriceBreak, TTIParts,
         ArrowPricingResponse, ArrowPricingTier } from '../types';
    

const ARROW = 'Arrow';
const TTI = 'TTI';
const ARROW_API = 'https://backend-takehome.s3.us-east-1.amazonaws.com/myarrow.json';
const TTI_API = 'https://backend-takehome.s3.us-east-1.amazonaws.com/tti.json';


async function getData(API_URL: string) {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function parseArrowData() {
    const arrowData = await getData(ARROW_API);
    const aggregatedParts: AggregatedPart[] = arrowData.pricingResponse.map((response: ArrowPricingResponse) => {
    let packagings: Packaging[] = response.pricingTier ? response.pricingTier.map((pricingTier: ArrowPricingTier) => {

        let priceBreak: PriceBreak = {
        breakQuantity: Number(pricingTier.minQuantity),
        unitPrice: Number(pricingTier.resalePrice),
        totalPrice: parseFloat((Number(pricingTier.minQuantity) * Number(pricingTier.resalePrice)).toFixed(4))
        }

        return {
        type: response.pkg,
        minimumOrderQuantity: response.minOrderQuantity,
        quantityAvailable: response.spq,
        unitPrice: response.resalePrice ? Number(response.resalePrice) : -1,
        supplier: ARROW,
        priceBreaks: [priceBreak],
        manufacturerLeadTime: response.leadTime ? String(response.leadTime.supplierLeadTime) : "-1"
        }
    }) : [];

    return {
        name: String(response.itemId),
        description: response.description,
        totalStock: Number(response.fohQuantity),
        manufacturerLeadTime: response.leadTime ? response.leadTime.supplierLeadTime : -1,
        manufacturerName: response.manufacturer,
        packaging: packagings,
        productDoc: response.urlData[2].value,
        productUrl: response.urlData[3].value,
        productImageUrl: response.urlData[1].value,
        specifications: [],
        sourceParts: [ARROW],
    }
    })
    return aggregatedParts;
}


export async function parseTTIData() {
    const ttiData = await getData(TTI_API);
    const aggregatedParts: AggregatedPart[] = ttiData.parts.map((parts: TTIParts) => {
    let packagings: Packaging[] = parts.pricing ? parts.pricing.quantityPriceBreaks.map((priceBreaks: TTIPriceBreak) => {

        let priceBreak: PriceBreak = {
        breakQuantity: priceBreaks.quantity,
        unitPrice: Number(priceBreaks.price),
        totalPrice: parseFloat((priceBreaks.quantity * Number(priceBreaks.price)).toFixed(4))
        }

        return {
        type: parts.packaging,
        minimumOrderQuantity: parts.salesMinimum,
        quantityAvailable: parts.availableToSell,
        unitPrice: parts.pricing.vipPrice,
        supplier: TTI,
        priceBreaks: [priceBreak],
        manufacturerLeadTime: parts.leadTime
        }
    }) : [];

    return {
        name: parts.ttiPartNumber,
        description: parts.description,
        totalStock: parts.availableToSell,
        manufacturerLeadTime: parseLeadTime(parts.leadTime),
        manufacturerName: parts.manufacturer,
        packaging: packagings,
        productDoc: parts.datasheetURL,
        productUrl: parts.buyUrl,
        productImageUrl: parts.imageURL,
        specifications: [],
        sourceParts: [TTI],
    }
    })
    return aggregatedParts;
}

function parseLeadTime(leadTime: string) {
    let times = leadTime.split(' ');
    let time = times[1]
    if (time === 'Weeks' || time === 'Week') {
    return Number(times[0]) * 7;
    }
    else if (time === 'Days' || time === 'Day') {
    return Number(times[0]);
    }
    return -1;
}