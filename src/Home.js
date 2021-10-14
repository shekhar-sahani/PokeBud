import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { Listitems } from "./Constants/List";
import Scrollbars from "react-custom-scrollbars-2";
import { Button, ListItem } from "@material-ui/core";
import { AiOutlineDelete } from "react-icons/ai";

const getLocalItems = () => {
  let TodayList = localStorage.getItem("today_item");
  if (TodayList) {
    return JSON.parse(localStorage.getItem("today_item"));
  } else {
    return [];
  }
};

const PokeLocalStorage = () => {
  let pokebud = localStorage.getItem("poke");

  if (pokebud) {
    return JSON.parse(localStorage.getItem("poke"));
  } else {
    return [];
  }
};

export default function Home() {
  const [modalShow, setModalShow] = useState(false);
  const [poke, setPoke] = useState(PokeLocalStorage());
  const [show, setShow] = useState();
  const [List, setList] = useState([]);
  const [today, setToday] = useState(getLocalItems());
  const [item, setItem] = useState();
  const [price, setPrice] = useState();

  // console.log("total", amountSpentInOneDay);

  // const toggleicon1 = () => {
  //   document.getElementById("icon1").classList.toggle("rotate");
  // };

  // const toggleicon2 = () => {
  //   document.getElementById("icon2").classList.toggle("rotate");
  // };

  useEffect(() => {
    setList(Listitems);
  }, []);

  useEffect(() => {
    localStorage.setItem("today_item", JSON.stringify(today));
    localStorage.setItem("poke", JSON.stringify(poke));
  }, [poke]);

  const toggleClass = (id) => {
    const copy = List;
    if (copy[id]["icon"]) copy[id]["icon"] = false;
    else copy[id]["icon"] = true;

    if (copy[id]["show"]) copy[id]["show"] = false;
    else copy[id]["show"] = true;
    setList(copy);

    setShow(!show);
  };
  // const amountSpentInOneDay = List.reduce((a, b) => a + +b.price, 0);

  // console.log("amount", amountSpentInOneDay);

  const totalTodayAmount = today.reduce((a, b) => a + +b.amount, 0);
  // setTotalAmount(todayAmount);

  const addTodayItems = () => {
    setToday([
      ...today,
      {
        id: today.length,
        name: item,
        amount: price,
      },
    ]);
    if (price !== 0) {
      const updatedPoke = poke - price;
      setPoke(updatedPoke);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setPoke(poke + +e.target.value);
    }
  };

  const removeTodayItems = (item) => {
    var updatedItems = today.filter((newitem) => {
      return item.id !== newitem.id;
    });
    setToday(updatedItems);
    // Deleted array for reseting the value of poke
    var deletedItem = today.filter((newitem) => {
      return item.id === newitem.id;
    });
    setPoke(poke + +deletedItem[0].amount);
  };

  // Date and Time
  var d = new Date();
  // var displayDate = d.getDate() + "/" + d.getMonth()
  var Today = d.getDate() + "/" + d.getMonth();

  var Yesterday = d.getDate() - 1 + "/" + d.getMonth();

  // localStorage.setItem("name", "starlord");
  // localStorage.removeItem("name");

  // sessionStorage.setItem("name", "gamora");
  // console.log(sessionStorage.getItem("name"));
  // sessionStorage.removeItem('name')

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Amount
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <h6>Enter Updated Amount</h6>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
            className="form-group"
          >
            <input
              onKeyDown={(e) => handleKeyPress(e)}
              className="form-control"
              type="number"
            />
          </form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div>
      <div className="container">
        <h3 className="logo p-3">PokeBud</h3>
        <div className="d-flex justify-content-around">
          <p style={{ fontSize: "18px" }}>
            Total Amount in : <span> ${poke} </span>{" "}
          </p>
          <BsPencil
            onClick={() => setModalShow(true)}
            style={{ cursor: "pointer" }}
          />
        </div>

        <form className="form-group">
          <input
            placeholder="Enter Item Name"
            className="form-control custom-form my-4"
            type="text"
            onChange={(e) => setItem(e.target.value)}
            required
          />
          <input
            placeholder="Enter Price"
            className="form-control custom-form my-4"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <div>
            <Button onClick={addTodayItems} variant="contained" color="primary">
              Add
            </Button>
          </div>
        </form>

        <Scrollbars style={{ width: "auto", height: "370px" }}>
          {List.map((list, id) => (
            <>
              <div
                style={{ cursor: "pointer" }}
                key={id}
                onDoubleClick={() => toggleClass(id)}
                className="container border mb-3 pt-3 d-flex justify-content-between flex-wrap"
              >
                {list.id === 0 && <p>Spend in {Today} </p>}
                {list.id === 1 && <p>Spend in {Yesterday} </p>}
                <p>{list.id === 0 && totalTodayAmount} </p>
                <div>
                  <i
                    className={
                      list.icon
                        ? "fas fa-chevron-down not_rotate"
                        : "fas fa-chevron-down rotate"
                    }
                  ></i>
                </div>
                <div
                  style={{ width: "100%" }}
                  className={list.show ? "show_list" : "hide_list"}
                >
                  {list.id === 0 ? (
                    <>
                      {today.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            textDecoration: "underline",
                            textUnderlinePosition: "under",
                          }}
                          className="d-flex justify-content-between"
                        >
                          <p style={{ width: "70%" }}>{item.name}</p>
                          <b style={{ width: "10%" }}>{item.amount} </b>
                          <div
                            onClick={() => removeTodayItems(item)}
                            style={{ width: "10%" }}
                          >
                            <AiOutlineDelete />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  style={{ width: "100%" }}
                  className={list.show ? "show_list" : "hide_list"}
                >
                  <div
                    style={{
                      textDecoration: "underline",
                      textUnderlinePosition: "under",
                    }}
                    className="d-flex justify-content-between"
                  ></div>
                </div>
              </div>
            </>
          ))}
        </Scrollbars>

        {/* <div className="container">
          <div className="d-flex justify-content-between">
            <h4>{showItem} </h4>
            <p>{showPrice} </p>
          </div>
        </div> */}

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
}
