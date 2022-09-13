import React, { useState } from "react";
import HeaderNav from "./HeaderNav";
import { Table, Button, Form } from "react-bootstrap";

import UnauthorizedAccess from "./UnauthorizedAccess";
import axios from "axios";

function Home() {
  const [PortfolioId, setPortfolioId] = useState();
  const [StockList, setStockList] = useState({});
  const [MutualFundList, setMutualFundList] = useState();
  const [Portfoliodetails, setPortfoliodetails] = useState();
  const [NetWorth, setNetWorth] = useState(0);
  const [StockToSell, setStockToSell] = useState();
  const [MutualFundToSell, setMutualFundToSell] = useState();

  async function getWeather() {
    const search = `https://localhost:44375/api/NetWorth/GetPortFolioDetailsByID/${localStorage.getItem(
      "userid"
    )}`;
    let result = await axios.get(search);
    //   console.log("Bearer "+localStorage.getItem("token").replaceAll('"',''));
    // console.log(result.data);
    setPortfoliodetails(result.data);
    setPortfolioId(result.data.portFolioId);
    setStockList(result.data.stockList);
    setMutualFundList(result.data.mutualFundList);

    let tempStockList = StockList;
    setStockToSell(tempStockList);
    if (StockToSell) {
      StockToSell.map((e) => (e.stockCount = 0));
    }

    console.log("Here is Stock To Sell Default value", StockToSell);
    // console.log(result.data.stockList);

    let tempMutualFundList = MutualFundList;
    setMutualFundToSell(tempMutualFundList);
    if (MutualFundToSell) {
      MutualFundToSell.map((e) => (e.mutualFundUnits = 0));
    }

    getNetworth();
  }
  async function getNetworth() {
    const url = `https://localhost:44375/api/NetWorth/GetNetWorth`;
    console.log(JSON.stringify(Portfoliodetails));
    const data = JSON.stringify(Portfoliodetails);
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: data,
    });
    result = await result.json();
    //console.log(result);
    setNetWorth(result.networth);
    console.log("Stock To Sell:", StockToSell);
    console.log("Mutual Fund To Sell:", MutualFundToSell);
  }

  async function Sell() {
    console.log("Stock To Sell Finally", StockToSell);
    console.log("Mutual Fund To Sell Finally", MutualFundToSell);
    let inp = [
      Portfoliodetails,
      {
        portFolioId: PortfolioId,
        stockList: StockToSell,
        mutualFundList: MutualFundToSell,
      },
    ];
    console.log(inp);
    const url="https://localhost:44375/api/NetWorth/SellAssets";
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(inp),
    });
    console.log(result.json());
    await getWeather();

  }

  return localStorage.getItem("token") ? (
    <>
      <HeaderNav />

      <div className="col-lg-8 offset-lg-2 mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th className="col-6">Stock</th>

              <th className="col-2">No of Units</th>
              <th className="col-2">No. of unit to sell</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(StockList) ? (
              StockList.map((stock, index) => (
                <tr>
                  <td key={index}> {index + 1}</td>
                  <td>{stock.stockName}</td>

                  <td>{stock.stockCount}</td>
                  <td>
                    <Form.Control
                      type="number"
                      id={index}
                      min={0}
                      max={stock.stockCount}
                      defaultValue={0}
                      onChange={(e) =>
                        (StockToSell[index].stockCount = parseInt(e.target.value))
                      }
                    ></Form.Control>
                  </td>
                </tr>
              ))
            ) : (
              <div>Buy Something to show here</div>
            )}
          </tbody>
        </Table>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th className="col-6">Mutual Funds</th>

              <th className="col-2">No of Units</th>
              <th className="col-2">No. of unit to sell</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(MutualFundList) ? (
              MutualFundList.map((mutualfund, index) => (
                <tr>
                  <td key={index}> {index + 1}</td>
                  <td>{mutualfund.mutualFundName}</td>

                  <td>{mutualfund.mutualFundUnits}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min={0}
                      id={index}
                      max={mutualfund.mutualFundUnits}
                      defaultValue={0}
                      onChange={(e) =>
                        (MutualFundToSell[index].mutualFundUnits =
                          parseInt(e.target.value))
                      }
                    ></Form.Control>
                  </td>
                </tr>
              ))
            ) : (
              <div className="text-center">Buy Something to show here</div>
            )}
          </tbody>
        </Table>

        <div>Total NetWorth : {NetWorth}</div>
      </div>

      <Button onClick={getWeather} variant="primary offset-5">
        Fetch
      </Button>
      <Button onClick={Sell} variant="primary offset-3">
        Sell
      </Button>
    </>
  ) : (
    <UnauthorizedAccess />
  );
}

export default Home;
