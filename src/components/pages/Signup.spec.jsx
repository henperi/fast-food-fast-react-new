/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { shallow } from 'enzyme';
import { SignupPage, mapStateToProps } from './SignupPage';

describe('rendering', () => {
  let wrapper;
  let props;
  let nextProps;
  let mockedSignUpState;
  beforeEach(() => {
    mockedSignUpState = {
      auth: {
        isAuthenticated: true,
        loading: null,
        user: { id: 1, iat: 1549439277, exp: 1549525677 },
      },
      errors: [],
      isLoading: false,
    };
    props = {
      signupUser: jest.fn(),
      history: {
        push: jest.fn(),
      },
      user: {
        isAuthenticated: true,
      },
    };
    nextProps = {
      history: {
        push: jest.fn(),
      },
      errors: [],
    };
  });

  it('invokes `componentDidMount` when mounted', () => {
    const spy = jest.spyOn(SignupPage.prototype, 'componentDidMount');
    wrapper = shallow(<SignupPage {...props} />);
    wrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it('invokes `componentWillRecieveProps` when mounted', () => {
    const spy = jest.spyOn(SignupPage.prototype, 'componentWillReceiveProps');
    wrapper = shallow(<SignupPage {...props} />);
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(spy).toHaveBeenCalled();
  });

  it('should render the component', () => {
    wrapper = shallow(<SignupPage {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should test for onchange', () => {
    const event = {
      target: { name: 'email', value: 'test@test.com' },
      preventDefault: () => {},
    };

    wrapper.instance().onChange(event);
    expect(wrapper.state().email).toEqual('test@test.com');
    expect(wrapper.instance().state.email).toEqual(event.target.value);
  });

  it('should test the onSubmit function', () => {
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    wrapper = shallow(<SignupPage {...props} />);
    const signupForm = wrapper.find('form');
    signupForm.simulate('submit', fakeEvent);
    const signupUser = jest.fn(mockedSignUpState);
    const promise = new Promise((resolve) => {
      resolve(wrapper.instance().onSubmit);
    });
    promise.then(() => expect(signupUser).toHaveBeenCalledTimes(1));
  });

  it('should test mapStateToProps', () => {
    const state = mapStateToProps(props);
    expect(state).toBeTruthy();
  });
});
