import { AuthGuard } from "@/components";
import { Layout } from "@/layout";
import { auth } from "@/lib";
import { useOrders } from "@/providers";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const CompletedCardsRequests: React.FC = () => {
  const { getCompletedOrders, orders, getOrders } = useOrders();
  const router = useRouter();

  const reloadData = useCallback(async () => {
    if (orders?.length <= 0) {
      await getOrders(auth?.currentUser?.uid as string);
    }
  }, [orders, getOrders]);

  useEffect(() => {
    reloadData();
  }, [getCompletedOrders, reloadData]);

  if (orders?.length > 0) {
    return (
        <AuthGuard requiredAbility={['manage', 'workshop-dashboard']}>
        <Layout>
   
        <div
          className="row d-xl-flex justify-content-xl-center pt-5 align-items-xl-center rounded .bg-secondary.bg-gradient"
          style={{ margin: "0px" }}
        >
          {getCompletedOrders().map((doc, index) => (
            <div key={index} className="col-md-6 col-xl-3 mb-4" style={{ cursor: "pointer" }}>
              <div className="card shadow border-left-success py-2">
                <div className="card-body">
                  <div className="row align-items-center no-gutters text-center">
                    <div className="col mr-2">
                      <div className="text-uppercase text-success font-weight-bold text-xs mb-1" hidden>
                        <span>Request Id : {doc.requestid}</span>
                      </div>
                      <div className="text-uppercase">
                        <span>Car : {doc.carmake}</span>
                      </div>
                      <div className="text-uppercase">
                        <span>Year : {doc.caryear}</span>
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
   
      <div className="bodyDiv">
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

export default CompletedCardsRequests;
