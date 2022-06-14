import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button, ButtonGroup } from "@mui/material";
import { useDispatch } from "react-redux";
import { orderByModule } from "../../../redux/actions/questions";


export default function Avatars({ orderByModule }) {
  return (
    <Stack direction="row" spacing={2} sx={{ display: "inline" }}>
      <ButtonGroup
        variant="container"
        arial-label="container button group"
        sx={{ bgcolor: "background.default" }}
      >
        <Button size="large">
          <Avatar
            onClick={orderByModule}
            size="small"
            sx={{ bgcolor: "background.white", color: "#FBC02D" }}
          >
            <b>
              M1
            </b>
          </Avatar>
        </Button>
        <Button>
          <Avatar
            onClick={orderByModule}
            sx={{ bgcolor: "background.white", color: "#43A047" }}
          >
            <b>
              M2
            </b>
          </Avatar>
        </Button>
        <Button>
          <Avatar
            onClick={orderByModule}
            sx={{ bgcolor: "background.white", color: "#D81B60" }}
          >
            <b>
              M3
            </b>
          </Avatar>
        </Button>
        <Button>
          <Avatar
            onClick={orderByModule}
            sx={{ bgcolor: "background.white", color: "#42A5F5" }}
          >
            <b>
              M4
            </b>
          </Avatar>
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
