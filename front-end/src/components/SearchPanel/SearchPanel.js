import React, { useState } from "react";
import Panel from "../UI/Panel/Panel";
import { suggestedCities, unitsOfMeasurment } from "../../utilities/constants";
import styles from "./SearchPanel.less";

const SearchPanel = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className={styles.searchPanel}>
      <Panel>
        <span className={styles.searchTitle}>
          5 day Forecast - Search Cities
        </span>
        <div className={styles.searchInput}>
          {props.children}
          <datalist id="suggestions">
            {suggestedCities.map((selectedCity) => (
              <option key={selectedCity} value={selectedCity}>
                {selectedCity}
              </option>
            ))}
          </datalist>
          <select
            onChange={(event) => props.setUnits(event.target.value)}
            value={props.units}
          >
            {Object.keys(unitsOfMeasurment).map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>
          <input
            onChange={(event) => setSearchQuery(event.target.value)}
            autoComplete="on"
            list="suggestions"
            value={searchQuery}
          />
          <button onClick={() => props.setCity(searchQuery.toLowerCase())}>
            Search
          </button>
        </div>
      </Panel>
    </div>
  );
};

export default SearchPanel;
