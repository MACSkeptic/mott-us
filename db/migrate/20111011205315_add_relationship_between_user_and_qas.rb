class AddRelationshipBetweenUserAndQas < ActiveRecord::Migration
  def up
    add_column :qas, :user_id, :integer 
  end

  def down
    remove_column :qas, :user_id
  end
end
