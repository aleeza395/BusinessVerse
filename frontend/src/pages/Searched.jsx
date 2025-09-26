import StartupCostChart from "../components/StartupCostChart";
import OneTimeExpensesChart from "../components/OneTimeExpenseChart";
import '../App.css'

const Searched = ({ data }) => {
  if (!data || data.length === 0) return <p>No results found.</p>;

  return (
    <div id="searched">
      {data.map((item, index) => (
        <div key={index}>
          <h1>{item.business_type}</h1>
          <p>
            < h3>Category</ h3> {item.category}
          </p>

          {item.risks_involved && (
            <>
              <h4>Risks Involved</h4>
              <ul>
                {item.risks_involved.map((risk, idx) => (
                  <li key={idx}>
                    <div>{risk}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.possible_profits_and_revenue && (
            <>
              {item.possible_profits_and_revenue.profit_margins && (
                <>
                  < h3>Profit Margins</ h3>
                  <ul>
                    {Object.entries(
                      item.possible_profits_and_revenue.profit_margins
                    ).map(([key, value], idx) => (
                      <li key={idx}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {item.possible_profits_and_revenue.startup_revenue_first_year && (
                <p>
                  < h3>Startup Revenue (Year 1):</ h3>
                  <div>
                    {
                      item.possible_profits_and_revenue
                        .startup_revenue_first_year
                    }
                  </div>
                </p>
              )}
              {item.possible_profits_and_revenue
                .established_business_owner_income && (
                <p>
                  < h3>Established Business Owner Income</ h3>
                  <div>
                    {
                      item.possible_profits_and_revenue
                        .established_business_owner_income
                    }
                  </div>
                </p>
              )}
              {item.possible_profits_and_revenue.revenue_models && (
                <>
                  < h3>Revenue Models</ h3>
                  <ul>
                    {item.possible_profits_and_revenue.revenue_models.map(
                      (model, idx) => (
                        <li key={idx}>
                          <div>{model}</div>
                        </li>
                      )
                    )}
                  </ul>
                </>
              )}
            </>
          )}

          <StartupCostChart costs={item.costs} />
          <OneTimeExpensesChart breakdown={item.costs?.breakdown} />

          {item.costs.breakdown.recurring_expenses && (
            <>
              <h4>Recurring Expenses</h4>
              <ul>
                {item.costs.breakdown.recurring_expenses.map((p, idx) => (
                  <li key={idx}>
                    <div>{p}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.marketing_needed && (
            <>
              <h2>Marketing Needed</h2>
              < h3>Digital Marketing</ h3>
              <ul>
                {item.marketing_needed.digital_marketing?.map(
                  (marketingItem, idx) => (
                    <li key={`dm-${idx}`}>
                      <div>{marketingItem}</div>
                    </li>
                  )
                )}
              </ul>
              < h3>Experiential Marketing</ h3>
              <ul>
                {item.marketing_needed.experiential_marketing?.map(
                  (marketingItem, idx) => (
                    <li key={`em-${idx}`}>
                      <div>{marketingItem}</div>
                    </li>
                  )
                )}
              </ul>
              <ul>
                {item.marketing_needed.other_marketing?.map(
                  (marketingItem, idx) => (
                    <li key={`em-${idx}`}>
                      <div>{marketingItem}</div>
                    </li>
                  )
                )}
              </ul>
            </>
          )}

          {item.target_market && (
  <>
    <h4>Target Market</h4>

    {Array.isArray(item.target_market) && (
      <ul>
        {item.target_market.map((p, idx) => (
          <li key={idx}><div>{p}</div></li>
        ))}
      </ul>
    )}

    {!Array.isArray(item.target_market) && (
      <>
        {item.target_market.definition && (
          <p><div>{item.target_market.definition}</div></p>
        )}
        {item.target_market.segmentation_examples && (
          <ul>
            {item.target_market.segmentation_examples.map((example, idx) => (
              <li key={idx}><div>{example}</div></li>
            ))}
          </ul>
        )}
      </>
    )}
  </>
)}


{item.unique_selling_point && (
  <>
    <h4>Unique Selling Point</h4>

    {Array.isArray(item.unique_selling_point) && (
      <ul>
        {item.unique_selling_point.map((p, idx) => (
          <li key={idx}><div>{p}</div></li>
        ))}
      </ul>
    )}

    {!Array.isArray(item.unique_selling_point) && (
      <>
        {item.unique_selling_point.definition && (
          <p><div>{item.unique_selling_point.definition}</div></p>
        )}
        {item.unique_selling_point.examples_of_usps && (
          <ul>
            {item.unique_selling_point.examples_of_usps.map((example, idx) => (
              <li key={idx}><div>{example}</div></li>
            ))}
          </ul>
        )}
      </>
    )}
  </>
)}

{item.suggested_strategies && (
            <>
              <h4>Suggessted Strategies</h4>
              <ul>
                {item.suggested_strategies.map((strategy, idx) => (
                  <li key={idx}>
                    <div>{strategy}</div>
                  </li>
                ))}
              </ul>
            </>
          )}


          {item.legal_practices && (
            <>
              <h4>Legal Practices</h4>
              <ul>
                {item.legal_practices.map((practice, idx) => (
                  <li key={idx}>
                    <div>{practice}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.already_established_businesses && (
            <>
              <h4>Already Established Businesses</h4>
              <ul>
                {item.already_established_businesses.map((biz, idx) => (
                  <li key={idx}>
                    <div>{biz}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.related_ideas && (
            <>
              <h4>Related Ideas</h4>
              <ul>
                {item.related_ideas.map((idea, idx) => (
                  <li key={idx}>
                    <div>{idea}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {item.data_resources && (
            <>
              <h4>Data Resources</h4>
              <ul>
                {item.data_resources.map((resource, idx) => (
                  <li key={idx}>
                    <div>{resource}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Searched;
