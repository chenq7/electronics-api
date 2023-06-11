import { AggregatedPart } from '../../types';
import { parseArrowData } from '../data';

export default async function Page() {
    const arrowData = await parseArrowData();
    return(arrowData.map((data: AggregatedPart) => {
        return (
          <div>
            <h3>Supplier: {data.sourceParts[0]}</h3>
            <table className="outer-table">
              <tbody>
                <tr>
                  <td className='left-col'>Name</td>
                  <td className='right-col'>{data.name}</td>
                </tr>
                <tr>
                  <td className='left-col'>Description</td>
                  <td className='right-col'>{data.description}</td>
                </tr>
                <tr>
                  <td className='left-col'>TotalStock</td>
                  <td className='right-col'>{data.totalStock}</td>
                </tr>
                <tr>
                  <td className='left-col'>ManufacturerLeadTime</td>
                  <td className='right-col'>{data.manufacturerLeadTime}</td>
                </tr>
                <tr>
                  <td className='left-col'>ManufacturerName</td>
                  <td className='right-col'>{data.manufacturerName}</td>
                </tr>
                <tr>
                  <td className='left-col'>Packaging</td>
                  <td className='right-col'>{data.packaging.map((packaging) => {
                    return (
                      <table className="inner-table">
                        <tbody>
                          <tr>
                            <td>type</td>
                            <td>minimumOrderQuantity</td>
                            <td>quantityAvailable</td>
                            <td>unitPrice</td>
                            <td>supplier</td>
                            <td>breakQuantity</td>
                            <td>unitPrice</td>
                            <td>totalPrice</td>
                            <td>manufacturerLeadTime</td>
                          </tr>
                          <tr>
                            <td>{packaging.type}</td>
                            <td>{packaging.minimumOrderQuantity}</td>
                            <td>{packaging.quantityAvailable}</td>
                            <td>{packaging.unitPrice}</td>
                            <td>{packaging.supplier}</td>
                            <td>{packaging.priceBreaks.length > 0 ? packaging.priceBreaks[0].breakQuantity : undefined}</td>
                            <td>{packaging.priceBreaks.length > 0 ? packaging.priceBreaks[0].unitPrice : undefined}</td>
                            <td>{packaging.priceBreaks.length > 0 ? packaging.priceBreaks[0].totalPrice: undefined}</td>
                            <td>{packaging.manufacturerLeadTime}</td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  })}
                  </td>
                </tr>
                <tr>
                  <td className='left-col'>ProductDoc</td>
                  <td className='right-col'>{data.productDoc}</td>
                </tr>
                <tr>
                  <td className='left-col'>ProductUrl</td>
                  <td className='right-col'>{data.productUrl}</td>
                </tr>
                <tr>
                  <td className='left-col'>ProductImageUrl</td>
                  <td className='right-col'>{data.productImageUrl}</td>
                </tr>
                <tr>
                  <td className='left-col'>Specifications</td>
                  <td className='right-col'>{data.specifications.map((spec) => (JSON.stringify(spec)))}</td>
                </tr>
                <tr>
                  <td className='left-col'>SourceParts</td>
                  <td className='right-col'>{data.sourceParts[0]}</td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
          </div>
        )
      })
    )
}