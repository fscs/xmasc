class AddTuerchenToImps < ActiveRecord::Migration
  def change
    add_column :imps, :tuerchen, :integer
  end
end
