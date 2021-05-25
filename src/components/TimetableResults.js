import { useContext, useEffect } from "react";
import { TrainContext } from "../TrainContext";
import TimetableData from "./TimetableData";

const TimetableResults = ({ station }) => {
    const { data, loading, runSearch } = useContext(TrainContext);
    useEffect(() => {
        runSearch(station);
        // eslint-disable-next-line
    }, [station])

    return (
        <div>
            { loading ? "Loading..." : <TimetableData data={data} /> }
        </div>
    )
}

export default TimetableResults;