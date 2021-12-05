import React, { useEffect, useState } from "react";
import { useUser } from "../../common/hooks/useUser";
import { Button, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useApi } from "../../common/hooks/useApi";
import getConsumptions from "../../services/consumptionApiService";
import { fetchData } from "../../services/fetchData";

export default function Consumptions() {
  const { user } = useUser();
  const userToken = user.signInUserSession.idToken.jwtToken;
  const [selection, setSelection] = useState([]);
  const [consumptions, setConsumptions] = useApi(() =>
    getConsumptions(userToken)
  );

  const columns = [
    { title: "id", field: "id" },
    { title: "idPublication", field: "idPublication" },
    { title: "idPointSale", field: "idPointSale" },
    { title: "copies", field: "copies" },
    { title: "date", field: "date" },
    { title: "origen", field: "origen" },
    { title: "create_user", field: "create_user" },
    { title: "update_user", field: "update_user" },
    { title: "created", field: "created" },
    { title: "update", field: "update" },
  ];

  const handleSelection = (newSelection) => {
    setSelection(newSelection);
  };

  const handleUnsubscribe = () => {
    alert("Aquí daríamos de baja a las filas: " + selection);
  };

  useEffect(() => {
    fetchData(setConsumptions);
  }, []);

  return (
    <>
      <h3> Consumptions component. Acceso privado</h3>
      <div
        style={{
          height: 400,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {consumptions.isFetching ? (
          <CircularProgress size={24} />
        ) : (
          <DataGrid
            rows={consumptions.data || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={handleSelection}
          />
        )}
      </div>

      <Button component={Link} to="/consumptions/new" variant="contained">
        Nuevo consumo
      </Button>
      {selection && selection.length > 0 && (
        <Button onClick={handleUnsubscribe} variant="outlined">
          Dar de baja
        </Button>
      )}
    </>
  );
}
