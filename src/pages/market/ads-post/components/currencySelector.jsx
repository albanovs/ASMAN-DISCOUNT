export const CurrencySelector = ({ currency, setCurrency, post, setPost }) => (
    <div className="box_market">
        <label className="label_market">Цена</label>
        <div className="currency-selection">
            <div className="currency-option">
                <input
                    type="radio"
                    value="USD"
                    checked={currency === "USD"}
                    onChange={() => setCurrency("USD")}
                    id="usd"
                />
                <label htmlFor="usd">USD</label>
            </div>
            <div className="currency-option">
                <input
                    type="radio"
                    value="СОМ"
                    checked={currency === "СОМ"}
                    onChange={() => setCurrency("СОМ")}
                    id="som"
                />
                <label htmlFor="som">СОМ</label>
            </div>
        </div>
        <input
            value={post.price}
            onChange={(e) => setPost({ ...post, price: e.target.value })}
            className="input_market"
            placeholder="Цена"
            type="number"
        />
    </div>
);