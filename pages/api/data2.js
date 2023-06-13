const data = [
  {
    name: "Long",
    color: "green",
  },
  {
    name: "Stage 1",
    color: "green",
  },
  {
    name: "Stage 2",
    color: "green",
  },
  {
    name: "Head and Shoulders",
    color: "green",
  },
  {
    name: "Inverse Head and Shoulders",
    color: "red",
  },
  {
    name: "Double Top",
    color: "red",
  },
  {
    name: "Fib Retracement",
    color: "#2020a0",
  },
  {
    name: "Upside Break",
    color: "green",
  },
  {
    name: "Downside Break",
    color: "red",
  },
  {
    name: "Double Bottom",
    color: "green",
  },
  {
    name: "Bear Flag",
    color: "red",
  },
  {
    name: "Bullish Flag",
    color: "green",
  },
  {
    name: "Up Trendline",
    color: "green",
  },
  {
    name: "Down Trendline",
    color: "red",
  },
  {
    name: "Consolidation",
    color: "#2020a0",
  },
  {
    name: "Multiply Tops",
    color: "red",
  },
  {
    name: "Multiply Bottoms",
    color: "green",
  },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return the data when a GET request is made
    res.status(200).json(data);
  } else {
    // Return an error for other types of requests
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
