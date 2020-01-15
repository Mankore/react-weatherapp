class BlogPost extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        blogPost: DataSource.getBlogPost(props.id)
      };
    }
  
    componentDidMount() {
      DataSource.addChangeListener(this.handleChange);
    }
  
    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }
  
    handleChange() {
      this.setState({
        blogPost: DataSource.getBlogPost(this.props.id)
      });
    }
  
    render() {
      return <TextBlock text={this.state.blogPost} />;
    }
  }

  //______________________________________________________________________________________________________________________________________________________

  const CommentListWithSubscription = withSubscription(
    CommentList,
    (DataSource) => DataSource.getComments()
  );
  
  const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource, props) => DataSource.getBlogPost(props.id)
  );


  // Эта функция принимает компонент...
function withSubscription(WrappedComponent, selectData) {
    // ...и возвращает другой компонент...
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          data: selectData(DataSource, props)
        };
      }
  
      componentDidMount() {
        // ...который подписывается на оповещения...
        DataSource.addChangeListener(this.handleChange);
      }
  
      componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
      }
  
      handleChange() {
        this.setState({
          data: selectData(DataSource, this.props)
        });
      }
  
      render() {
        // ... и рендерит оборачиваемый компонент со свежими данными!
        // Обратите внимание, что мы передаём остальные пропсы
        return <WrappedComponent data={this.state.data} {...this.props} />;
      }
    };
  }

  //______________________________________________________________________________________________________________________________________________________