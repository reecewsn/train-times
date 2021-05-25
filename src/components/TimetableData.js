import { Alert, Badge, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TimetableData = props => {
    const data = props.data;

    let notices;
    if (data.nrccMessages) {
        notices = data.nrccMessages.map((notice, idx) => {
            return (
                <Alert key={idx} variant="warning">
                    <div dangerouslySetInnerHTML={{__html: notice.value}} />
                </Alert>
            )
        })
    }

    let departures;
    let isDepartures = false;
    if (data.trainServices) {
        isDepartures = true;
        departures = data.trainServices.map(svc => {
            let status;
            let status_info;
            if (svc.etd === "On time") {
                status = <Badge variant="success">On time</Badge>;
            } else if (svc.etd === "Delayed") {
                status = <Badge variant="warning">Delayed</Badge>;
            } else if (svc.etd === "Cancelled") {
                status = <Badge variant="danger">Cancelled</Badge>;
            } else {
                status = <Badge variant="warning">Departing {svc.etd}</Badge>;
            }

            let reason = svc.cancelReason || svc.delayReason
            if (reason) {
                status_info =   <OverlayTrigger
                                    key={svc.serviceID} placement="left"
                                   overlay={<Tooltip id={`tooltip-${svc.serviceID}`}>{reason}</Tooltip>}>
                                    <div style={{float: "right"}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                        </svg>
                                    </div>
                                </OverlayTrigger>
            }

            return (
                <tr key={svc.serviceID}>
                    <td>{svc.std}</td>
                    <td><Link to={svc.destination[0].crs}>{svc.destination[0].locationName}</Link></td>
                    <td>{svc.platform}</td>
                    <td>{svc.operator}</td>
                    <td>{status}{status_info}</td>
                </tr>
            )
        })
    } else {
        departures = <Alert variant="warning">No upcoming services are scheduled from this station.</Alert>
    }

    document.title = `${data.locationName} | Train Times`
    return (
        <div>
            <h2 style={{marginTop: "30px"}}>Departures from {data.locationName}</h2>

            {notices}

            { isDepartures ? 
                <Table bordered responsive size>
                    <thead>
                        <tr>
                            <th style={{width: "8%"}}>Time</th>
                            <th style={{width: "45%"}}>Destination</th>
                            <th style={{width: "8%"}}>Platform</th>
                            <th style={{width: "24%"}}>Operator</th>
                            <th style={{width: "15%"}}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departures}
                    </tbody>
                </Table>
            : departures }
        </div>
    )
}

export default TimetableData;
