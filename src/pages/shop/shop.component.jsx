import React from "react"; 
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionsFetching } from "../../redux/shop/shop.selector";

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match, isCollectionFetching } = this.props; 
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => (
            <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />
          )}
        />
      </div>
    )
  }
};

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionsFetching
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);