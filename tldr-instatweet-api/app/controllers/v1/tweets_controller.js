module.exports = (function() {

  'use strict';

  const Nodal = require('nodal');
  const Tweet = Nodal.require('app/models/tweet.js');

  class V1TweetsController extends Nodal.Controller {

    index() {

      Tweet.query()
        .join( 'user' )
        .where(this.params.query)
        .end((err, models) => {

          this.respond(err || models, [ 'id', 'body', 'created_at', { user: [ 'username', 'email', 'created_at' ] } ] );

        });

    }

    show() {

      Tweet.query()
        .join( 'user' )
        .where({ id: this.params.route.id })
        .end((err, models) => {

          this.respond(err || models, [ 'id', 'body', 'created_at', { user: [ 'username', 'email', 'created_at' ] } ] );

      });

    }

    create() {

      Tweet.create(this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    update() {

      Tweet.update(this.params.route.id, this.params.body, (err, model) => {

        this.respond(err || model);

      });

    }

    destroy() {

      Tweet.destroy(this.params.route.id, (err, model) => {

        this.respond(err || model);

      });

    }

  }

  return V1TweetsController;

})();
