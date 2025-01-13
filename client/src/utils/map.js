import { meterToPyung, simplePrice } from './house'

export const getOverlay = (imageSrc, houseInfo) => {
  return `
    <img src="${imageSrc}" width="84px" style="position:absolute;left:-0.65em;top:0.65em;"/>
    <div onmouseover="markerHoverHandler(${
      houseInfo.houseId
    })" onclick="markerClickHandler(${
    houseInfo.houseId
  })" style="cursor:pointer;position:absolute;top:0.6em;padding:0 0.5em; min-width:72px;display:flex;flex-direction:column;align-items:center;justify-contents:center;border-radius:8px; color:white; z-index:10">
      <p style="padding:0;color:#e0e0e0; text-align:center; width:100%; font-weight:bold;">
        ${meterToPyung(houseInfo.deal.exclusiveArea)}평
      </p>
      <h3 style="margin-top:-4px;font-weight:bolder;font-size:1.2em;">
        ${simplePrice(houseInfo.deal.price * 10000)}
      </h3>
    </div>
  `
}
