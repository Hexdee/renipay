import Button from "@app/components/common/Button";
import { ArrrowLeft } from "@app/components/Icon/icons";
import Table from "@app/components/Table";
import { useAuthContext } from "@app/utils/contexts.js/AuthProvider";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const name = "Sender's name";
const description = "Description";
const amount_received = "Amount Received";
const dateReceived = "Date Received";

const tableBody = [
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv",
    amount_received: 23,
  },
  {
    name: "Jane Walker",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Stephen Curry",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Samuel JackSon Mackerel Moose",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv",
    amount_received: 23,
  },
  {
    name: "Jane Walker",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Stephen Curry",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Samuel JackSon Mackerel Moose",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv",
    amount_received: 23,
  },
  {
    name: "Jane Walker",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Stephen Curry",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Samuel JackSon Mackerel Moose",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv",
    amount_received: 23,
  },
  {
    name: "Jane Walker",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Stephen Curry",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Samuel JackSon Mackerel Moose",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv",
    amount_received: 23,
  },
  {
    name: "Jane Walker",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Stephen Curry",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Samuel JackSon Mackerel Moose",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv.lorem ipsum ipse dic donot homo sapiens erectus treblez uncourv",
    amount_received: 23,
  },
  {
    name: "Jane Walker",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Stephen Curry",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "Samuel JackSon Mackerel Moose",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
  {
    name: "John Doe",
    description:
      "lorem ipsum ipse dic donot homo sapiens erectus treblez uncourve",
    amount_received: 23,
  },
];
const tableHeader = [
  {
    name: "No",
    // fration: "oneth",
    width: " w-[64px]",
    className: "text-center",
  },
  { name: name, fraction: "threeth" },
  { name: description, fraction: "seventh" },
  { name: amount_received, fraction: "threeth" },
  { name: dateReceived, fraction: "threeth" },
];

const Transactions = ({ isLoading }) => {
  const { user } = useAuthContext();
  const SINGLE_STRETCH = 10;
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setTransactions(user?.transactions?.slice(0, SINGLE_STRETCH));
    }
    // setTimeout(() => {
    //   setIsLoadingTransactions(false);
    //     setTransactions(tableBody.slice(0, SINGLE_STRETCH));
    // }, 2000);
    return () => {};
  }, [isLoading, user?.transactions]);

  const handleShowMore = () => {
    setTransactions([
      ...transactions,
      ...user?.transactions?.slice(
        transactions.length,
        transactions.length + SINGLE_STRETCH
      ),
    ]);
  };
  return (
    <div>
      <Link to={"/profile"}>
        <Button variant="link" icon={ArrrowLeft} iconPosition="left">
          Back to Profile
        </Button>
      </Link>
      <p className="font-semibold text-h3 text-primary-01">
        Transactions History
      </p>

      <section className="md:w-[98%] mx-auto max-w-3xl md:overflow-x-scroll h-max">
        <div className="md:w-max md:max-w-3xl md:overflow-x-scroll h-max">
          <Table
            spinPosition={"start"}
            isLoading={isLoading}
            emptyTableText={
              !!transactions?.length && !isLoading
                ? null
                : "There are no transactions yet!"
            }
          >
            <Table.Header data={tableHeader} />
            <Table.Body>
              {transactions?.map((item, index) => (
                <>
                  <tr
                    className={classNames(" py-4 ", {
                      "bg-neutral-01 bg-opacity-60": index % 2,
                    })}
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{item?.payer}</td>
                    <td className="multiline-ellipsis hover:overflow-visible hover:block hover:cursor-pointer py-1">
                      {item?.description}
                    </td>
                    <td>{item?.amount}</td>
                    <td>{item?.createdAt}</td>
                  </tr>
                </>
              ))}
            </Table.Body>
          </Table>
          {/* <p></p> */}
        </div>
      </section>
      {Boolean(transactions?.length) &&
        transactions?.length < tableBody?.length &&
        !isLoadingTransactions && (
          <div className="flex justify-around">
            <Button variant="link" onClick={handleShowMore}>
              show more ...
            </Button>
          </div>
        )}
    </div>
  );
};

export default Transactions;
