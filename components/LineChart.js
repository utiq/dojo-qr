import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import _ from "lodash";

const zones = ["no-mask", "mask-unvaccinated", "mask-vaccinated"];
const times = [15, 60, 120, 180, 240, 300, 360, 420];

const InteractiveBox = ({
  roomArea,
  roomHeight,
  merv,
  ventilationOutsideAir,
}) => {
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState([]);

  const getZones = () => {
    const requestData = [];
    zones.forEach((zone) => {
      times.forEach((time) => {
        requestData.push({
          zone_id: zone,
          roomArea,
          roomHeight,
          specificTime: time,
          ventilationOutsideAir,
          totalRoomAirFlow: 0.5,
          MERV: merv,
          presentPeople: 1,
          probBeingInfective: 0.01,
          wearingMask: zone === "no-mask" ? zone : "cloth-mask",
        });
      });
    });
    return { zones: requestData };
  };

  const plotData = (data) => {
    const tempData = times.map((time) => ({
      name: time,
    }));
    zones.forEach((zone) => {
      tempData.forEach((nd) => {
        // time < 60 ? `${time}` : `${time / 60}h`
        const tempResp = data.find(
          (resp) => resp.zone_results.time === nd.name && resp.zone_id === zone
        );
        nd[zone] =
          zone === "mask-vaccinated"
            ? nd["mask-unvaccinated"] * 0.91
            : tempResp.zone_results.conditional * 100;
      });
    });
    setLoading(false);
    setNewData(tempData);
  };

  useEffect(async () => {
    try {
      const resp = await axios.post(
        "https://dev-api.dojo.co/api/v1/estimator/plot",
        getZones()
      );
      plotData(resp.data);
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }, []);

  return (
    <>
      <Typography variant="h2">Infection risk in this room</Typography>
      {!loading && (
        <ResponsiveContainer width={"100%"} height={350}>
          <LineChart
            width={"100%"}
            height={350}
            data={newData}
            margin={{
              top: 30,
              right: 10,
              left: -30,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend layout="vertical" />
            <Line
              name="No Mask"
              type="monotone"
              dataKey="no-mask"
              stroke="#FFD116"
              strokeWidth={4}
              activeDot={{ r: 8 }}
            />
            <Line
              name="Mask & Unvaccinated"
              type="monotone"
              dataKey="mask-unvaccinated"
              strokeWidth={4}
              stroke="#9B9B9B"
            />
            <Line
              name="Mask & Vaccinated"
              type="monotone"
              dataKey="mask-vaccinated"
              strokeWidth={4}
              stroke="#059CDE"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default InteractiveBox;
