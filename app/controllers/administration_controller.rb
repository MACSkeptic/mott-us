class AdministrationController < ApplicationController
  def users
    @users = User.all
  end
end
