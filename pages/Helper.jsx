const generateStockUrl = (x, timeFrame, toggole) => {
  const baseUrl =
    "https://charts2-node.finviz.com/chart.ashx?cs=l&t=%s&tf=%t&s=linear&ct=candle_stick&tm=d%o";
  const tf = timeFrame ? "w" : "d";
  const optionalParams = toggole
    ? "&o[0][ot]=sma&o[0][op]=50&o[0][oc]=FF8F33C6&o[1][ot]=sma&o[1][op]=200&o[1][oc]=DCB3326D&o[2][ot]=sma&o[2][op]=20&o[2][oc]=DC32B363&o[3][ot]=patterns&o[3][op]=&o[3][oc]=000"
    : "";

  return baseUrl
    .replace("%s", x)
    .replace("%t", tf)
    .replace("%o", optionalParams);
};

export default generateStockUrl;
