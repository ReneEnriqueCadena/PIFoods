import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
 
import Details from './components/detail/detail';
import Foo from './Foo';
 
describe('<Details />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<Details />);
    expect(wrapper.find(Foo)).to.have.lengthOf(3);
  });
 
  it('renders an `.icon-star`', () => {
    const wrapper = shallow(<Details />);
    expect(wrapper.find('.icon-star')).to.have.lengthOf(1);
  });
 
  it('renders children when passed in', () => {
    const wrapper = shallow((
      <Details>
        <div className="unique" />
      </Details>
    ));
    expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  });
 
  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});