import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
    const [ data, setData ] = useState([]);
    const colors = [
        "#4cc9f0",
        "#f72585",
        "#4361ee",
        "#7209b7",
        "#3a0ca3",
        "#480ca8",
      ];

    useEffect(() => {
        const getData = () => {
          const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
          const data = genres.map((genre) => {
            const value = events.filter(({ summary} ) =>
              summary.includes(genre)
            ).length;
            return { name: genre, value };
          });
          return data.filter((genre) => { return genre.value > 0});
        };
        setData(() => getData());
      }, [events]);

    return (
        <ResponsiveContainer height={400}>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenre;