import React, { useState, useMemo, startTransition, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./Main.css";

const Main = () => {
  const [value, setValue] = useState({ label: "Australia", value: "AU" });
  const [selectedYear, setSelectedYear] = useState({
    label: "FY 2022-23",
    value: "2022-23",
  });
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [expenses, setExpenses] = useState("");
  const [investmentType, setInvestmentType] = useState("");
  const [annualIncomeRange, setAnnualIncomeRange] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };
  // Financial year dropdown
  const yearOptions = [
    { label: "FY 2022-23", value: "2022-23" },
    { label: "FY 2023-24", value: "2023-24" },
    { label: "FY 2024-25", value: "2024-25" },
    { label: "FY 2025-26", value: "2025-26" },
    { label: "FY 2026-27", value: "2026-27" },
  ];

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };
  //short term and long term
  const handleInvestmentTypeChange = (type) => {
    setInvestmentType(type);
  };
  // Calculate tax rate based on annual income
  const calculateTaxRate = () => {
    const annualIncomeRanges = {
      "0-18,200": 0,
      "18,201-45,000": 0.19,
      "45,001-120,000": 0.325,
      "120,001-180,000": 0.375,
      "180,001-Infinity": 0.45,
    };

    return annualIncomeRanges[annualIncomeRange] || 0;
  };

  const calculateCapitalGains = () => {
    return salePrice - purchasePrice - expenses;
  };

  const calculateDiscountForLongTermGains = () => {
    if (investmentType === "Long Term") {
      const capitalGains = calculateCapitalGains();
      return capitalGains > 0 ? capitalGains * 0.5 : 0;
    }
    return 0;
  };
  const calculateNetCapitalGains = () => {
    if (investmentType === "Long Term") {
      const capitalGains = calculateCapitalGains();
      const discount = calculateDiscountForLongTermGains();
      return capitalGains - discount;
    } else {
      return calculateCapitalGains();
    }
  };

  const calculateTaxToBePaid = () => {
    const netCapitalGains = calculateNetCapitalGains();
    const taxRate = calculateTaxRate();
    return netCapitalGains * taxRate;
  };
  // Update tax rate when annual income changes
  const [taxRate, setTaxRate] = useState(calculateTaxRate());

  useEffect(() => {
    setTaxRate(calculateTaxRate());
  }, [annualIncomeRange]);

  const handleAnnualIncomeRangeChange = (selectedOption) => {
    // Set the annual income range based on the selected option
    setAnnualIncomeRange(selectedOption.value);
  };

  // Define options for the annual income dropdown
  const annualIncomeOptions = [
    { label: "$0 - $18,200", value: "0-18,200" },
    { label: "$18,201 - $45,000", value: "18,201-45,000" },
    { label: "$45,001 - $120,000", value: "45,001-120,000" },
    { label: "$120,001- $180,000", value: "120,001-180,000" },
    { label: "Over $180,000", value: "180,001-Infinity" },
  ];

  return (
    <div className="Main_container">
      <div className="Main_header">
        <h3>Free Crypto Tax Calculator Austraila</h3>
      </div>
      <div className="year_Country">
        <div className="label-dropdown">
          <label>Financial Year</label>
          <Select
            options={yearOptions}
            value={selectedYear}
            onChange={handleYearChange}
          />
        </div>
        <div className="label-dropdown">
          <label>Country</label>
          <Select
            className="country_dropdown"
            options={options}
            value={value}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="Input_details">
        <div className="Purchase_Price">
          <label>Enter purchase price of Crypto</label>
          <input
            className="Textbox"
            placeholder="$"
            type="number"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
        </div>
        <div className="Sale_Price">
          <label>Enter sale price of Crypto</label>
          <input
            className="Textbox"
            placeholder="$"
            type="number"
            value={salePrice}
            onChange={(e) => setSalePrice(e.target.value)}
          />
        </div>
        <div className="Expenses">
          <label>Enter your Expenses</label>
          <input
            className="Textbox"
            placeholder="$"
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
        </div>
        <div className="buttons-labels">
          <label>Investment Type</label>
          <div className="buttons_section">
            <button
              className={`investment-button ${
                investmentType === "Short Term" ? "selected" : ""
              }`}
              onClick={() => handleInvestmentTypeChange("Short Term")}
            >
              Short Term
            </button>
            <button
              className={`investment-button ${
                investmentType === "Long Term" ? "selected" : ""
              }`}
              onClick={() => handleInvestmentTypeChange("Long Term")}
            >
              Long Term
            </button>
          </div>
          <div className="Months_details">
            <span> {`<12 months`}</span>
            <span> {`>12 months`}</span>
          </div>
        </div>
        <div className="Annual-income">
          <label>Annual Income</label>
          <Select
            options={annualIncomeOptions}
            value={annualIncomeOptions.find(
              (option) => option.value === annualIncomeRange
            )}
            onChange={handleAnnualIncomeRangeChange}
          />
        </div>
        <div className="tax_rate_details">
          <p className="Tax_rate">{`Tax Rate:  $5092 + ${(
            calculateTaxRate() * 100
          ).toFixed(1)}% of excess over $45,001`}</p>
        </div>
        <div className="Capital_gains">
          <label>Capital gain amount</label>
          <input
            className="Textbox"
            placeholder="$"
            type="number"
            value={calculateCapitalGains()}
            readOnly
          />
        </div>
        <div className="Discount_gains">
          {investmentType === "Long Term" && calculateCapitalGains() > 0 && (
            <>
              <label>Discount for long term gains</label>
              <input
                className="Textbox"
                type="number"
                value={calculateDiscountForLongTermGains()}
                readOnly
              />
            </>
          )}
        </div>
        <div className="Tax_results">
          <div className="Capital_gain">
            <label className="Tax_result_labels">
              Net Capital gain tax amount
            </label>
            <p className="gain">${calculateNetCapitalGains()}</p>
          </div>
          <div className="tax_amount">
            <label className="Tax_result_labels">Tax you need to pay*</label>
            <p className="pay_tax">${calculateTaxToBePaid()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
