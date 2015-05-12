import template from '../src/index';

function placeholders (html = '') {
  return '<!---->' + html + '<!---->';
}

describe('shade', function () {
  it('(String)', function () {
    template('<content></content>');
  });

  it('(Node)', function () {
    template(document.createElement('content'));
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

    it('takes a string', function () {
      template('some string')('<div></div>');
    });

    it('returns the element that was passed in', function () {
      expect(template('some string')(div)).to.equal(div);
      expect(template('some string')('<div></div>')).to.be.an.instanceof(window.HTMLDivElement);
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
      expect(div.textContent).to.equal(null);
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

      describe('mutable collection', function () {
        var collection;

        function testArgumentNormalization (method) {
          it('(String)', function () {
            collection[method]('<one></one>');
            expect(collection.length).to.equal(1);
          });

          it('(Node)', function () {
            collection[method](document.createElement('one'));
            expect(collection.length).to.equal(1);
          });

          it('(DocumentFragment)', function () {
            var fragment = document.createDocumentFragment();
            fragment.appendChild(document.createElement('one'));
            fragment.appendChild(document.createElement('two'));
            collection[method](fragment);
            expect(collection.length).to.equal(2);
          });

          it('(Traversable)', function () {
            var fragment = document.createDocumentFragment();
            fragment.appendChild(document.createElement('one'));
            fragment.appendChild(document.createElement('two'));
            collection[method](fragment.childNodes);
            expect(collection.length).to.equal(2);
          });

          it('(Array of any)', function () {
            var fragment1 = document.createDocumentFragment();
            var fragment2 = document.createDocumentFragment();

            fragment1.appendChild(document.createElement('three'));
            fragment1.appendChild(document.createElement('four'));
            fragment2.appendChild(document.createElement('five'));
            fragment2.appendChild(document.createElement('six'));

            collection[method]([
              '<one></one>',
              document.createElement('two'),
              fragment1,
              fragment2.childNodes,
              ['<seven></seven>', document.createElement('eight')]
            ]);

            expect(collection.length).to.equal(8);
          });
        }

        beforeEach(function () {
          collection = template('<content multiple></content>')(div).textContent;
        });

        describe('properties', function () {
          it('all', function () {
            expect(collection.all).to.be.an('array');
          });

          it('length', function () {
            expect(collection.length).to.equal(0);
          });
        });

        describe('methods', function () {
          describe('append', function () {
            testArgumentNormalization('append');

            it('appends', function () {
              var one = document.createElement('one');
              var two = document.createElement('two');
              var three = document.createElement('three');

              collection.append(one);
              collection.append([two, three]);

              expect(collection.all[0]).to.equal(one);
              expect(collection.all[1]).to.equal(two);
              expect(collection.all[2]).to.equal(three);
            });
          });

          describe('at', function () {
            it('(Number)', function () {
              var one = document.createElement('one');
              collection.append(one);
              expect(collection.at(0)).to.equal(one);
            });
          });

          describe('clear', function () {
            it('(void)', function () {
              collection.append('<one></one>');
              collection.clear();
              expect(collection.length).to.equal(0);
            });
          });

          describe('content', function () {
            testArgumentNormalization('content');
          });

          describe('index', function () {
            it('(Node)', function () {
              var one = document.createElement('one');
              expect(collection.index(one)).to.equal(-1);
              collection.append(one);
              expect(collection.index(one)).to.equal(0);
            });
          });

          describe('insert', function () {
            testArgumentNormalization('insert');

            it('inserts', function () {
              var one = document.createElement('one');
              var two = document.createElement('two');
              var three = document.createElement('three');
              var four = document.createElement('four');
              var five = document.createElement('five');
              var six = document.createElement('six');
              var seven = document.createElement('seven');

              collection.append([one, four, seven]);
              collection.insert([two, three], 1);
              collection.insert([five, six], 4);

              expect(collection.all[0]).to.equal(one);
              expect(collection.all[1]).to.equal(two);
              expect(collection.all[2]).to.equal(three);
              expect(collection.all[3]).to.equal(four);
              expect(collection.all[4]).to.equal(five);
              expect(collection.all[5]).to.equal(six);
              expect(collection.all[6]).to.equal(seven);
            });
          });

          describe('prepend', function () {
            testArgumentNormalization('prepend');

            it('prepends', function () {
              var one = document.createElement('one');
              var two = document.createElement('two');
              var three = document.createElement('three');

              collection.prepend(one);
              collection.prepend([two, three]);

              expect(collection.all[0]).to.equal(two);
              expect(collection.all[1]).to.equal(three);
              expect(collection.all[2]).to.equal(one);
            });
          });

          describe('remove', function () {
            it('removes', function () {
              var one = document.createElement('one');

              collection.append(one);
              expect(collection.length).to.equal(1);

              collection.remove(0);
              expect(collection.length).to.equal(0);

              collection.append(one);
              expect(collection.length).to.equal(1);

              collection.remove(one);
              expect(collection.length).to.equal(0);
            });
          });
        });
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
          expect(div.textContent).to.equal(null);
        });

        it('select', function () {
          template('<content select="span">')(div);
          expect(div.textContent).to.equal(null);
        });

        it('select and multiple', function () {
          template('<content select="span" multiple></content>')(div);
          expect(div.textContent).to.be.an('object');
        });
      });

      describe('projects the default content if specified', function () {
        it('bare', function () {
          template('<content name="content">default</content>')(div);
          expect(div.textContent).to.equal('default');
        });

        it('select', function () {
          template('<content name="content" select="span">default</content>')(div);
          expect(div.textContent).to.equal('default');
        });

        it('select and multiple', function () {
          template('<content name="content" select="span" multiple>default</content>')(div);
          expect(div.textContent).to.equal('default');
        });
      });

      describe('projects content from node after it is initialised', function () {
        it('bare', function () {
          div.innerHTML = 'custom';
          template('<content name="content">default</content>')(div);
          expect(div.textContent).to.equal('custom');
        });

        it('select', function () {
          div.innerHTML = '<span>custom</span>';
          template('<content name="content" select="span">default</content>')(div);
          expect(div.textContent).to.equal('custom');
        });

        it('select and multiple', function () {

        });
      });

      describe('projects content from node after it is updated', function () {
        it('bare', function () {
          template('<content name="content">default</content>')(div);
          div.content = 'custom';
          expect(div.textContent).to.equal('custom');
        });

        it('select', function () {
          template('<content name="content" select="span">default</content>')(div);
          div.content = '<span>custom</span>';
          expect(div.textContent).to.equal('custom');
        });

        it('select and multiple', function () {

        });
      });

      describe('restore default content when node is emptied', function () {
        it('bare', function () {
          template('<content name="content">default</content>')(div);
          div.content = 'custom';
          div.content = '';
          expect(div.textContent).to.equal('default');
        });

        it('select', function () {
          template('<content name="content" select="span">default</content>')(div);
          div.content = '<span>custom</span>';
          div.content = '';
          expect(div.textContent).to.equal('default');
        });

        it('select and multiple', function () {

        });
      });

      describe('does not do anything if emptied and no default content was specified', function () {
        it('bare', function () {
          template('<content name="content"></content>')(div);
          div.content = 'custom';
          div.content = '';
          expect(div.textContent).to.equal('');
        });

        it('select', function () {
          template('<content name="content" select="span"></content>')(div);
          div.content = '<span>custom</span>';
          div.content = '';
          expect(div.textContent).to.equal('');
        });

        it('select and multiple', function () {

        });
      });
    });
  });
});
