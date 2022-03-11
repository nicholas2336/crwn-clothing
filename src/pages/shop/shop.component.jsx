import React from "react"; 
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

import withSpinner from "../../components/with-spinner/with-spinner.component";

import { updateCollections } from "../../redux/shop/shop.actions";

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading : true
  };

  unsubscribeFormSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const colletionRef = firestore.collection('collections');

    colletionRef.get().then(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({loading : false});
    });
  }

  render() {
    const { match } = this.props; 
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);