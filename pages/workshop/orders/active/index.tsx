import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useOrders } from "@/providers";
import { AuthGuard } from "@/components";
import { Layout } from "@/layout";

const ActiveCardsRequests: React.FC = () => {
  const router = useRouter();
  const { getActiveOrders } = useOrders();

  const activeOrders = getActiveOrders();

  console.log(activeOrders);

  if (activeOrders.length > 0) {
    return (
        <AuthGuard requiredAbility={['manage', 'workshop-dashboard']}>
            <Layout>
       
        <div
          className="row d-xl-flex justify-content-xl-center pt-5 align-items-xl-center rounded .bg-secondary.bg-gradient"
          style={{ margin: "0px" }}
        >
          {activeOrders.map((doc : any, index : number) => (
            <div key={index} className="col-md-6 col-xl-3 mb-4" style={{ cursor: "pointer" }}>
              <div className="card shadow-lg border-left-success py-2 rounded-3">
                <div className="card-body">
                  <div className="row align-items-center no-gutters text-center">
                    <div className="col mr-2">
                      <div className="d-grid justify-content-end">
                        <Link
                          href={{
                            pathname: "/map",
                            query: { id: doc.uid },
                          }}
                          passHref
                        >
                          <a className="text-center btn btn-outline-success rounded">
                            <i className="text-center fa fa-map-marker text-gray-300"> Get Location</i>
                          </a>
                        </Link>
                      </div>
                      <hr />
                      <div className="text-uppercase text-success font-weight-bold text-xs mb-1" hidden>
                        <span>Request Id : {doc.requestid}</span>
                      </div>
                      <div className="text-uppercase">
                        <span>Car : {doc.carmake}</span>
                      </div>
                      <div className="text-uppercase">
                        <span>Service Preference 1 : {doc.servicedatepreferenceone}</span>
                      </div>
                      <div className="text-uppercase">
                        <span>Service Preference 2 : {doc.servicedatepreferencetwo}</span>
                      </div>
                      <div className="text-uppercase">
                        <span>Service Preference 3 : {doc.servicedatepreferencethree}</span>
                      </div>
                      <hr />
                      <div className="text-uppercase">
                        <span>Service Period : {doc.serviceperiod}</span>
                      </div>
                      <div className="text-uppercase">
                        <span>Garage Address : {doc.garageaddress}</span>
                      </div>
                      <hr />
                      <div className="text-dark font-weight-bold">
                        <Link
                          href={{
                            pathname: "/chat",
                            query: { driverChat: true, driverId: doc.uid },
                          }}
                          passHref
                        >
                          <a className="btn btn-outline-secondary">
                            <i className="text-center fa fa-comments-o text-gray-300"> Chat</i>
                          </a>
                        </Link>
                        <Link
                          href={{
                            pathname: "/chat",
                            query: { driverChat: true, driverId: doc.driverid },
                          }}
                          passHref
                        >
                          <a className="btn btn-outline-info">
                            <i className="text-center fa fa-comments-o text-gray-300"> Chat with Driver</i>
                          </a>
                        </Link>
                        <Link
                          href={{
                            pathname: "/uncharged_services",
                            query: { order: JSON.stringify(doc) },
                          }}
                          passHref
                        >
                          <a className="btn btn-outline-danger m-2">
                            <i className="text-center fa fa-check text-gray-300"> Complete</i>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
      </AuthGuard>
    );
  } else {
    return (
        <AuthGuard requiredAbility={['manage', 'workshop-dashboard']}>
            <Layout>
      <div className="bodyDiv vh-75">
        <div className="App border rounded-0 shadow-lg m-4">
            <div className="d-flex justify-content-xl-center align-items-xl-center form-div">
            <h2 className="text-center">
              No Data Found
              <br />
            </h2>
          </div>
        </div>
      </div>
      </Layout>
      </AuthGuard>
    );
  }
}

export default ActiveCardsRequests;
