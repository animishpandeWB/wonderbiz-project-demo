import React, {useState} from 'react';

interface PumpData {
    id: number
    pumpName: string
    pumpType: string
    pumpStatus: boolean
}

const PumpTable = () => {

    const [searchInput, setSearchInput] = useState("");

    const pumps: PumpData[] = [
        {id: 1, pumpName: "Pump 1", pumpType: "Jet Pump", pumpStatus: true},
        {id: 2, pumpName: "Pump 2", pumpType: "Centrifugal Pump", pumpStatus: false},
        {id: 3, pumpName: "Pump 3", pumpType: "Piston Pump", pumpStatus: false},
        {id: 4, pumpName: "Pump 4", pumpType: "Jet Pump", pumpStatus: true},
        {id: 5, pumpName: "Pump 5", pumpType: "Centrifugal Pump", pumpStatus: true},
        {id: 6, pumpName: "Pump 6", pumpType: "Piston Pump", pumpStatus: false},
        {id: 7, pumpName: "Pump 7", pumpType: "Jet Pump", pumpStatus: true},
        {id: 8, pumpName: "Pump 8", pumpType: "Piston Pump", pumpStatus: true},
        {id: 9, pumpName: "Pump 9", pumpType: "Jet Pump", pumpStatus: false},
        {id: 10, pumpName: "Pump 10", pumpType: "Centrifugal Pump", pumpStatus: false}
    ];

    const [pumpsData, setPumpsData] = useState(pumps);

    const handleChange = (e: HTMLInputElement): void => {
        // e.preventDefault();
        setSearchInput(e.value);
    };

    if(searchInput.length > 0) {
        pumps.filter((pump) => {
            return pump.pumpName.match(searchInput);
        });
    }

    return (
        <div className='PumpTable'>
            <input 
                type='text'
                className='PumpTable--searchbar'
                placeholder='Search here'
                onChange={(e) => handleChange(e.target)}
                value={searchInput}
            />
            <table className='PumpTable--table'>
                <tr className='table--row'>
                    <th>Pump ID</th>
                    <th>Pump Name</th>
                    <th>Pump Type</th>
                    <th>Pump Status</th>
                </tr>
                {
                    pumpsData.map((pump) => {
                        return (
                        <div>
                            <tr>
                                <td>{pump.id}</td>
                                <td>{pump.pumpName}</td>
                                <td>{pump.pumpType}</td>
                                <td>{pump.pumpStatus}</td>
                            </tr>
                        </div>
                    )})
                }
            </table>
        </div>
    )
}

export default PumpTable;