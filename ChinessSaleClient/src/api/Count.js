import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GiftsByPurchaserCount = () => {
  const [count, setCount] = useState(0);
  const [gifts, setGifts] = useState([]);
  const [sales, setSales] = useState([]);
  const [filteredGifts, setFilteredGifts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [giftsResponse, salesResponse] = await Promise.all([
          axios.get('/api/gifts'),
          axios.get('/api/sales')
        ]);

        setGifts(giftsResponse.data);
        setSales(salesResponse.data);

      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (gifts.length > 0 && sales.length > 0) {
      const giftPurchaseCounts = sales.reduce((acc, sale) => {
        acc[sale.giftId] = (acc[sale.giftId] || 0) + 1;
        return acc;
      }, {});

      const filtered = gifts.filter(gift => giftPurchaseCounts[gift.id] === Number(count));
      setFilteredGifts(filtered);
    }
  }, [count, gifts, sales]);

  return (
    <div>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        placeholder="Enter number of purchasers"
      />
      <div>
        {filteredGifts.map(gift => (
          <div key={gift.id}>
            <p>{gift.name}</p>
            <p>{gift.category}</p>
            <p>Donor: {gift.donor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftsByPurchaserCount;
