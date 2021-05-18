import { useState } from "react";
import LineChart from "../components/LineChart";
import { Container, Typography, Box } from "@material-ui/core";
import Table from "../components/Table";

export default function Example() {
  const [roomArea] = useState(500);
  const [roomHeight] = useState(9);
  const [merv] = useState("MERV15");
  const [ventilationOutsideAir] = useState(0.67);
  const [airFiltration] = useState(4);

  return (
    <Container maxWidth="md">
      <Box mt={2.5} mb={1.5}>
        <Typography variant="h1">Room Info</Typography>
      </Box>
      <Table
        roomArea={roomArea}
        airFiltration={airFiltration}
        merv={merv}
        ventilationOutsideAir={ventilationOutsideAir}
      />
      <Box mt={5}>
        <LineChart
          roomArea={roomArea}
          roomHeight={roomHeight}
          airFiltration={airFiltration}
          merv={merv}
          ventilationOutsideAir={ventilationOutsideAir}
        />
      </Box>
    </Container>
  );
}
