import template from '../src/index';

function placeholders (html = '') {
  return '<!---->' + html + '<!---->';
}

describe('shade', function () {
  it('should accept a string', function () {
    template('some string');
  });

  it('should return a function', function () {
    expect(template()).to.be.a('function');
  });

  describe('template function', function () {
    var div;
    var tmp;

    beforeEach(function () {
      div = document.createElement('div');
    });

    afterEach(function () {
      div = undefined;
      tmp = undefined;
    });

    it('takes an element', function () {
      template('some string')(div);
    });

    it('returns the element that was passed in', function () {
      expect(template('some string')(div)).to.equal(div);
    });

    it('sets the content of the element to the template string', function () {
      template('some string')(div);
      expect(div.innerHTML).to.equal('some string');
    });

    it('creates properties for content items that have names', function () {
      template('<content name="test"></content>')(div);
      expect(div.test).to.equal(null);
    });

    it('creates a default property for content items that do not have names', function () {
      template('<content></content>')(div);
      expect(div.content).to.equal(null);
    });

    describe('getter returns', function () {
      it('single node', function () {
        div.innerHTML = 'test';
        template('<content name="test"></content>')(div);
        expect(div.test.textContent).to.equal('test');
      });

      it('single node (selector)', function () {
        div.innerHTML = '<span></span>';
        template('<content name="test" select="span"></content>')(div);
        expect(div.test.tagName).to.equal('SPAN');
      });

      it('node list', function () {
        div.innerHTML = 'test';
        template('<content name="test" multiple></content>')(div);
        expect(div.test.at(0).textContent).to.equal('test');
      });

      it('node list (selector)', function () {
        div.innerHTML = '<span></span>';
        template('<content name="test" multiple></content>')(div);
        expect(div.test.at(0).tagName).to.equal('SPAN');
      });

      describe('mutable node list', function () {

      });
    });

    describe('setter accepts', function () {
      beforeEach(function () {
        template('<content name="test" select="span"></content>')(div);
      });

      it('html', function () {
        div.test = '<span></span>';
        expect(div.test.tagName).to.equal('SPAN');
      });

      it('node', function () {
        div.test = '<span></span>';
        expect(div.test.tagName).to.equal('SPAN');
      });

      it('array of nodes', function () {
        div.test = [document.createElement('span')];
        expect(div.test.tagName).to.equal('SPAN');
      });

      it('node list', function () {
        var frag = document.createDocumentFragment();
        frag.appendChild(document.createElement('span'));
        div.test = frag.childNodes;
        expect(div.test.tagName).to.equal('SPAN');
      });

      it('document fragment', function () {
        var frag = document.createDocumentFragment();
        frag.appendChild(document.createElement('span'));
        div.test = frag;
        expect(div.test.tagName).to.equal('SPAN');
      });
    });

    describe('content', function () {
      describe('projects nothing if no default is specified', function () {
        it('bare', function () {
          template('<content></content>')(div);
          expect(div.innerHTML).to.equal(placeholders());
        });

        it('select', function () {
          template('<content select="span">')(div);
          expect(div.innerHTML).to.equal(placeholders());
        });

        it('select and multiple', function () {
          template('<content select="span" multiple')(div);
          expect(div.innerHTML).to.equal(placeholders());
        });
      });

      describe('projects the default content if specified', function () {
        it('bare', function () {
          template('<content>default</content>')(div);
          expect(div.innerHTML).to.equal(placeholders('default'));
        });

        it('select', function () {
          template('<content select="span">default</content>')(div);
          expect(div.innerHTML).to.equal(placeholders('default'));
        });

        it('select and multiple', function () {
          template('<content select="span" multiple>default</content>')(div);
          expect(div.innerHTML).to.equal(placeholders('default'));
        });
      });

      describe('projects content from node after it is initialised', function () {

      });

      describe('projects content from node after it is updated', function () {

      });

      describe('restore default content when node is emptied', function () {

      });

      describe('does not do anything if emptied and no default content was specified', function () {

      });
    });
  });
});
